import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMemberAccess } from "@/lib/member-access";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if ((await getMemberAccess(session.discordId)).isObserver)
    return NextResponse.json(
      { error: "Observer access is read-only." },
      { status: 403 },
    );
  const body = (await request.json().catch(() => null)) as {
    kind?: "hero" | "drone" | "gear";
    profile?: unknown;
  } | null;
  if (
    !body ||
    !["hero", "drone", "gear"].includes(body.kind ?? "") ||
    !body.profile ||
    typeof body.profile !== "object"
  )
    return NextResponse.json(
      { error: "Invalid lab profile." },
      { status: 400 },
    );
  const json = JSON.stringify(body.profile);
  if (json.length > 20_000)
    return NextResponse.json(
      { error: "Profile is too large." },
      { status: 400 },
    );
  const columns = {
    hero: "hero_profile_json",
    drone: "drone_profile_json",
    gear: "gear_profile_json",
  } as const;
  const column = columns[body.kind as keyof typeof columns];
  await env.DB.prepare(
    `INSERT INTO commander_progress (discord_id,${column},updated_at) VALUES (?,?,?) ON CONFLICT(discord_id) DO UPDATE SET ${column}=excluded.${column},updated_at=excluded.updated_at`,
  )
    .bind(session.discordId, json, Date.now())
    .run();
  return NextResponse.json({ ok: true });
}
