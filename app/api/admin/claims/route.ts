import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getMemberAccess } from '@/lib/member-access';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !(await getMemberAccess(session.discordId)).isAdmin) return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  const body = await request.json().catch(() => null) as { discordId?: string; action?: 'approve' | 'reject' } | null;
  if (!body?.discordId || !['approve','reject'].includes(body.action ?? '')) return NextResponse.json({ error: 'Invalid decision.' }, { status: 400 });
  const claim = await env.DB.prepare("SELECT lwma_player_id FROM identity_claims WHERE discord_id=? AND status='pending'").bind(body.discordId).first<{ lwma_player_id: string }>();
  if (!claim) return NextResponse.json({ error: 'Pending claim not found.' }, { status: 404 });
  if (body.action === 'approve') {
    const occupied = await env.DB.prepare("SELECT discord_id FROM members WHERE lwma_player_id=? AND verification_status='approved' AND discord_id<>?").bind(claim.lwma_player_id, body.discordId).first();
    if (occupied) return NextResponse.json({ error: 'Commander is already linked.' }, { status: 409 });
    await env.DB.batch([
      env.DB.prepare("UPDATE identity_claims SET status='approved', decided_at=?, decided_by=? WHERE discord_id=?").bind(Date.now(), session.discordId, body.discordId),
      env.DB.prepare("UPDATE members SET lwma_player_id=?, verification_status='approved', approved_by=?, approved_at=? WHERE discord_id=?").bind(claim.lwma_player_id, session.discordId, Date.now(), body.discordId),
    ]);
  } else {
    await env.DB.batch([
      env.DB.prepare("UPDATE identity_claims SET status='rejected', decided_at=?, decided_by=? WHERE discord_id=?").bind(Date.now(), session.discordId, body.discordId),
      env.DB.prepare("UPDATE members SET verification_status='rejected', lwma_player_id=NULL WHERE discord_id=?").bind(body.discordId),
    ]);
  }
  return NextResponse.json({ ok: true });
}
