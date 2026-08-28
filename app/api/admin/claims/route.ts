import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMemberAccess } from "@/lib/member-access";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !(await getMemberAccess(session.discordId)).isAdmin)
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 },
    );
  const body = (await request.json().catch(() => null)) as {
    discordId?: string;
    action?:
      | "approve"
      | "reject"
      | "assign"
      | "unlink"
      | "grant-observer"
      | "revoke-observer";
    lwmaPlayerId?: string;
  } | null;
  if (
    !body?.discordId ||
    !/^\d{15,22}$/.test(body.discordId) ||
    ![
      "approve",
      "reject",
      "assign",
      "unlink",
      "grant-observer",
      "revoke-observer",
    ].includes(body.action ?? "")
  )
    return NextResponse.json(
      { error: "Invalid decision or Discord ID." },
      { status: 400 },
    );
  if (body.action === "grant-observer") {
    const now = Date.now();
    await env.DB.prepare(
      `INSERT INTO members (discord_id,discord_username,display_name,role,verification_status,active,joined_at) VALUES (?,?,?,'observer','unlinked',1,?) ON CONFLICT(discord_id) DO UPDATE SET role='observer',lwma_player_id=NULL,player_name=NULL,verification_status='unlinked',active=1`,
    )
      .bind(body.discordId, body.discordId, body.discordId, now)
      .run();
    await env.DB.prepare("DELETE FROM identity_claims WHERE discord_id=?")
      .bind(body.discordId)
      .run();
    return NextResponse.json({ ok: true });
  }
  if (body.action === "revoke-observer") {
    await env.DB.prepare(
      "UPDATE members SET role='member',verification_status='unlinked' WHERE discord_id=? AND role='observer'",
    )
      .bind(body.discordId)
      .run();
    return NextResponse.json({ ok: true });
  }
  if (body.action === "assign") {
    const playerId = body.lwmaPlayerId?.trim();
    if (!playerId)
      return NextResponse.json(
        { error: "Choose a commander." },
        { status: 400 },
      );
    const player = await env.DB.prepare(
      "SELECT player_name FROM alliance_players WHERE lwma_player_id=? AND active=1",
    )
      .bind(playerId)
      .first<{ player_name: string }>();
    if (!player)
      return NextResponse.json(
        { error: "Commander not found." },
        { status: 404 },
      );
    const occupied = await env.DB.prepare(
      "SELECT discord_id FROM members WHERE lwma_player_id=? AND verification_status='approved' AND discord_id<>?",
    )
      .bind(playerId, body.discordId)
      .first();
    if (occupied)
      return NextResponse.json(
        { error: "Commander is already linked." },
        { status: 409 },
      );
    const now = Date.now();
    await env.DB.batch([
      env.DB.prepare(
        `INSERT INTO members (discord_id,discord_username,display_name,player_name,lwma_player_id,role,verification_status,approved_by,approved_at,active,joined_at) VALUES (?,?,?,?,?,'member','approved',?,?,1,?) ON CONFLICT(discord_id) DO UPDATE SET player_name=excluded.player_name,lwma_player_id=excluded.lwma_player_id,verification_status='approved',approved_by=excluded.approved_by,approved_at=excluded.approved_at,active=1`,
      ).bind(
        body.discordId,
        body.discordId,
        body.discordId,
        player.player_name,
        playerId,
        session.discordId,
        now,
        now,
      ),
      env.DB.prepare(
        `INSERT INTO identity_claims (discord_id,lwma_player_id,status,requested_at,decided_at,decided_by) VALUES (?,?,'approved',?,?,?) ON CONFLICT(discord_id) DO UPDATE SET lwma_player_id=excluded.lwma_player_id,status='approved',decided_at=excluded.decided_at,decided_by=excluded.decided_by`,
      ).bind(body.discordId, playerId, now, now, session.discordId),
    ]);
    return NextResponse.json({ ok: true, playerName: player.player_name });
  }
  if (body.action === "unlink") {
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE members SET lwma_player_id=NULL,player_name=NULL,verification_status='unlinked',approved_by=NULL,approved_at=NULL WHERE discord_id=?",
      ).bind(body.discordId),
      env.DB.prepare("DELETE FROM identity_claims WHERE discord_id=?").bind(
        body.discordId,
      ),
    ]);
    return NextResponse.json({ ok: true });
  }
  const claim = await env.DB.prepare(
    "SELECT lwma_player_id FROM identity_claims WHERE discord_id=? AND status='pending'",
  )
    .bind(body.discordId)
    .first<{ lwma_player_id: string }>();
  if (!claim)
    return NextResponse.json(
      { error: "Pending claim not found." },
      { status: 404 },
    );
  if (body.action === "approve") {
    const occupied = await env.DB.prepare(
      "SELECT discord_id FROM members WHERE lwma_player_id=? AND verification_status='approved' AND discord_id<>?",
    )
      .bind(claim.lwma_player_id, body.discordId)
      .first();
    if (occupied)
      return NextResponse.json(
        { error: "Commander is already linked." },
        { status: 409 },
      );
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE identity_claims SET status='approved', decided_at=?, decided_by=? WHERE discord_id=?",
      ).bind(Date.now(), session.discordId, body.discordId),
      env.DB.prepare(
        "UPDATE members SET lwma_player_id=?, verification_status='approved', approved_by=?, approved_at=? WHERE discord_id=?",
      ).bind(
        claim.lwma_player_id,
        session.discordId,
        Date.now(),
        body.discordId,
      ),
    ]);
  } else {
    await env.DB.batch([
      env.DB.prepare(
        "UPDATE identity_claims SET status='rejected', decided_at=?, decided_by=? WHERE discord_id=?",
      ).bind(Date.now(), session.discordId, body.discordId),
      env.DB.prepare(
        "UPDATE members SET verification_status='rejected', lwma_player_id=NULL WHERE discord_id=?",
      ).bind(body.discordId),
    ]);
  }
  return NextResponse.json({ ok: true });
}
