import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getMemberAccess } from '@/lib/member-access';

type LwmaRow = { playerId?: string; playerName?: string; power?: string | number; level?: string | number; rank?: string; kills?: string | number; todayDonations?: string | number; weeklyDonations?: string | number };

function numberValue(value: string | number | undefined) {
  if (typeof value === 'number') return Math.round(value);
  const clean = String(value ?? '').split('(')[0].trim().replaceAll(',', '');
  const match = clean.match(/^(-?[\d.]+)\s*([KMB])?$/i);
  if (!match) return 0;
  const scale = { K: 1_000, M: 1_000_000, B: 1_000_000_000 }[match[2]?.toUpperCase() as 'K'|'M'|'B'] ?? 1;
  return Math.round(Number(match[1]) * scale);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !(await getMemberAccess(session.discordId)).isAdmin) return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  const body = await request.json().catch(() => null) as { rows?: LwmaRow[] } | null;
  const rows = (body?.rows ?? []).filter((row) => row.playerId && row.playerName).slice(0, 200);
  if (!rows.length) return NextResponse.json({ error: 'No LWMA roster rows supplied.' }, { status: 400 });
  const capturedAt = Date.now();
  await env.DB.batch(rows.map((row) => env.DB.prepare(`INSERT INTO alliance_players
    (lwma_player_id, player_name, power, level, alliance_rank, kills, today_donations, weekly_donations, source, captured_at, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'lwma', ?, 1)
    ON CONFLICT(lwma_player_id) DO UPDATE SET player_name=excluded.player_name, power=excluded.power, level=excluded.level,
      alliance_rank=excluded.alliance_rank, kills=excluded.kills, today_donations=excluded.today_donations,
      weekly_donations=excluded.weekly_donations, captured_at=excluded.captured_at, active=1`)
    .bind(row.playerId, row.playerName, numberValue(row.power), numberValue(row.level), row.rank ?? null, numberValue(row.kills), numberValue(row.todayDonations), numberValue(row.weeklyDonations), capturedAt)));
  await env.DB.prepare("INSERT INTO ingestion_runs (source, record_count, imported_by, imported_at) VALUES ('lwma-members-insights', ?, ?, ?)").bind(rows.length, session.discordId, capturedAt).run();
  return NextResponse.json({ ok: true, imported: rows.length });
}
