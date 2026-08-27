import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { getMemberAccess } from '@/lib/member-access';

type LwmaRow = { playerId?: string; playerName?: string; power?: string | number; level?: string | number; rank?: string; kills?: string | number; todayDonations?: string | number; weeklyDonations?: string | number };
type VsRow = { playerName?: string; points?: number; rank?: number };

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
  const contentType = request.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json')
    ? await request.json().catch(() => null) as { rows?: LwmaRow[]; vsRows?: VsRow[]; weekStart?: string } | null
    : { rows: JSON.parse(String((await request.formData()).get('rows') ?? '[]')) as LwmaRow[] };
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
  const vsRows = (body?.vsRows ?? []).filter((row) => row.playerName && Number.isFinite(row.points) && Number.isFinite(row.rank)).slice(0, 200);
  const weekStart = body?.weekStart?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0];
  if (vsRows.length && weekStart) {
    await env.DB.batch(vsRows.map((row) => env.DB.prepare(`INSERT INTO vs_scores (week_start, player_name, points, rank, captured_at)
      VALUES (?, ?, ?, ?, ?) ON CONFLICT(week_start, player_name) DO UPDATE SET points=excluded.points, rank=excluded.rank, captured_at=excluded.captured_at`)
      .bind(weekStart, row.playerName, Math.max(0, Math.round(row.points ?? 0)), Math.max(1, Math.round(row.rank ?? 1)), capturedAt)));
    await env.DB.prepare("INSERT INTO ingestion_runs (source, record_count, imported_by, imported_at) VALUES ('lwma-vs-scores', ?, ?, ?)").bind(vsRows.length, session.discordId, capturedAt).run();
  }
  return NextResponse.json({ ok: true, imported: rows.length, vsImported: vsRows.length });
}
