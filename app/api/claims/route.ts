import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getMemberAccess, syncMember } from '@/lib/member-access';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Sign in with Discord first.' }, { status: 401 });
  await syncMember(session);
  const access = await getMemberAccess(session.discordId);
  if (access.status === 'approved') return NextResponse.json({ error: 'Your commander is already linked.' }, { status: 409 });
  const body = await request.json().catch(() => null) as { lwmaPlayerId?: string } | null;
  const playerId = body?.lwmaPlayerId?.trim();
  if (!playerId) return NextResponse.json({ error: 'Choose your in-game commander.' }, { status: 400 });
  const player = await env.DB.prepare('SELECT player_name FROM alliance_players WHERE lwma_player_id=? AND active=1').bind(playerId).first<{ player_name: string }>();
  if (!player) return NextResponse.json({ error: 'That commander is not in the current OOPZ roster.' }, { status: 404 });
  const occupied = await env.DB.prepare("SELECT discord_id FROM members WHERE lwma_player_id=? AND verification_status='approved'").bind(playerId).first();
  if (occupied) return NextResponse.json({ error: 'That commander is already linked to another Discord member.' }, { status: 409 });
  await env.DB.prepare(`INSERT INTO identity_claims (discord_id, lwma_player_id, status, requested_at)
    VALUES (?, ?, 'pending', ?) ON CONFLICT(discord_id) DO UPDATE SET lwma_player_id=excluded.lwma_player_id, status='pending', requested_at=excluded.requested_at, decided_at=NULL, decided_by=NULL`)
    .bind(session.discordId, playerId, Date.now()).run();
  await env.DB.prepare("UPDATE members SET verification_status='pending', player_name=? WHERE discord_id=?").bind(player.player_name, session.discordId).run();
  return NextResponse.json({ ok: true, playerName: player.player_name });
}
