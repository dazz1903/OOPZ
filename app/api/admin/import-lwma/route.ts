import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMemberAccess } from "@/lib/member-access";

type LwmaRow = {
  playerId?: string;
  playerName?: string;
  power?: string | number;
  level?: string | number;
  rank?: string;
  kills?: string | number;
  todayDonations?: string | number;
  weeklyDonations?: string | number;
};
type VsRow = {
  playerName?: string;
  points?: number;
  rank?: number;
  daily?: {
    mon?: number | null;
    tue?: number | null;
    wed?: number | null;
    thu?: number | null;
    fri?: number | null;
    sat?: number | null;
  };
};
type ArenaRow = {
  playerName?: string;
  score?: number;
  squadPower?: string | number;
  rank?: number;
};
type HeroPowerRow = {
  playerName?: string;
  heroPower?: number;
  serverRank?: number;
};
type HistoryRow = {
  playerId?: string;
  captureDate?: string;
  power?: string | number;
  level?: string | number;
  rank?: string;
  kills?: string | number;
  todayDonations?: string | number;
  weeklyDonations?: string | number;
};

function numberValue(value: string | number | undefined) {
  if (typeof value === "number") return Math.round(value);
  const clean = String(value ?? "")
    .split("(")[0]
    .trim()
    .replaceAll(",", "");
  const match = clean.match(/^(-?[\d.]+)\s*([KMB])?$/i);
  if (!match) return 0;
  const scale =
    { K: 1_000, M: 1_000_000, B: 1_000_000_000 }[
      match[2]?.toUpperCase() as "K" | "M" | "B"
    ] ?? 1;
  return Math.round(Number(match[1]) * scale);
}

function playerName(value: string | undefined) {
  return String(value ?? "")
    .replace(/\d\/4$/, "")
    .replace(/\s+/g, " ")
    .trim();
}
function nullableNumber(value: string | number | undefined) {
  return value == null || String(value).trim() === "—"
    ? null
    : numberValue(value);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !(await getMemberAccess(session.discordId)).isAdmin)
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 403 },
    );
  const contentType = request.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? ((await request.json().catch(() => null)) as {
        rows?: LwmaRow[];
        historyRows?: HistoryRow[];
        vsRows?: VsRow[];
        weekStart?: string;
        arenaRows?: ArenaRow[];
        heroPowerRows?: HeroPowerRow[];
        captureDate?: string;
      } | null)
    : {
        rows: JSON.parse(
          String((await request.formData()).get("rows") ?? "[]"),
        ) as LwmaRow[],
      };
  const rows = (body?.rows ?? [])
    .filter((row) => row.playerId && row.playerName)
    .slice(0, 200);
  if (!rows.length)
    return NextResponse.json(
      { error: "No LWMA roster rows supplied." },
      { status: 400 },
    );
  const capturedAt = Date.now();
  await env.DB.batch(
    rows.map((row) =>
      env.DB.prepare(
        `INSERT INTO alliance_players
    (lwma_player_id, player_name, power, level, alliance_rank, kills, today_donations, weekly_donations, source, captured_at, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'lwma', ?, 1)
    ON CONFLICT(lwma_player_id) DO UPDATE SET player_name=excluded.player_name, power=excluded.power, level=excluded.level,
      alliance_rank=excluded.alliance_rank, kills=excluded.kills, today_donations=excluded.today_donations,
      weekly_donations=excluded.weekly_donations, captured_at=excluded.captured_at, active=1`,
      ).bind(
        row.playerId,
        row.playerName,
        numberValue(row.power),
        numberValue(row.level),
        row.rank ?? null,
        numberValue(row.kills),
        numberValue(row.todayDonations),
        numberValue(row.weeklyDonations),
        capturedAt,
      ),
    ),
  );
  await env.DB.prepare(
    "INSERT INTO ingestion_runs (source, record_count, imported_by, imported_at) VALUES ('lwma-members-insights', ?, ?, ?)",
  )
    .bind(rows.length, session.discordId, capturedAt)
    .run();
  const currentDate =
    body?.captureDate?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0] ??
    new Date().toISOString().slice(0, 10);
  await env.DB.batch(
    rows.map((row) =>
      env.DB.prepare(
        `INSERT INTO alliance_player_history (lwma_player_id,capture_date,power,level,alliance_rank,kills,today_donations,weekly_donations) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(lwma_player_id,capture_date) DO UPDATE SET power=excluded.power,level=excluded.level,alliance_rank=excluded.alliance_rank,kills=excluded.kills,today_donations=excluded.today_donations,weekly_donations=excluded.weekly_donations`,
      ).bind(
        row.playerId,
        currentDate,
        numberValue(row.power),
        nullableNumber(row.level),
        row.rank ?? null,
        nullableNumber(row.kills),
        nullableNumber(row.todayDonations),
        nullableNumber(row.weeklyDonations),
      ),
    ),
  );
  const historyRows = (body?.historyRows ?? [])
    .filter(
      (row) => row.playerId && row.captureDate?.match(/^\d{4}-\d{2}-\d{2}$/),
    )
    .slice(0, 1000);
  if (historyRows.length)
    await env.DB.batch(
      historyRows.map((row) =>
        env.DB.prepare(
          `INSERT INTO alliance_player_history (lwma_player_id,capture_date,power,level,alliance_rank,kills,today_donations,weekly_donations) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(lwma_player_id,capture_date) DO UPDATE SET power=excluded.power,level=excluded.level,alliance_rank=excluded.alliance_rank,kills=excluded.kills,today_donations=excluded.today_donations,weekly_donations=excluded.weekly_donations`,
        ).bind(
          row.playerId,
          row.captureDate,
          numberValue(row.power),
          nullableNumber(row.level),
          row.rank ?? null,
          nullableNumber(row.kills),
          nullableNumber(row.todayDonations),
          nullableNumber(row.weeklyDonations),
        ),
      ),
    );
  const vsRows = (body?.vsRows ?? [])
    .filter(
      (row) =>
        row.playerName &&
        Number.isFinite(row.points) &&
        Number.isFinite(row.rank),
    )
    .slice(0, 200);
  const weekStart = body?.weekStart?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0];
  if (vsRows.length && weekStart) {
    await env.DB.batch(
      vsRows.map((row) =>
        env.DB.prepare(
          `INSERT INTO vs_scores (week_start, player_name, points, rank, mon_points, tue_points, wed_points, thu_points, fri_points, sat_points, captured_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(week_start, player_name) DO UPDATE SET points=excluded.points, rank=excluded.rank,
      mon_points=excluded.mon_points, tue_points=excluded.tue_points, wed_points=excluded.wed_points, thu_points=excluded.thu_points, fri_points=excluded.fri_points, sat_points=excluded.sat_points, captured_at=excluded.captured_at`,
        ).bind(
          weekStart,
          playerName(row.playerName),
          Math.max(0, Math.round(row.points ?? 0)),
          Math.max(1, Math.round(row.rank ?? 1)),
          row.daily?.mon ?? null,
          row.daily?.tue ?? null,
          row.daily?.wed ?? null,
          row.daily?.thu ?? null,
          row.daily?.fri ?? null,
          row.daily?.sat ?? null,
          capturedAt,
        ),
      ),
    );
    await env.DB.prepare(
      "INSERT INTO ingestion_runs (source, record_count, imported_by, imported_at) VALUES ('lwma-vs-scores', ?, ?, ?)",
    )
      .bind(vsRows.length, session.discordId, capturedAt)
      .run();
  }
  const captureDate = body?.captureDate?.match(/^\d{4}-\d{2}-\d{2}$/)?.[0];
  const arenaRows = (body?.arenaRows ?? [])
    .filter(
      (row) =>
        row.playerName &&
        Number.isFinite(row.score) &&
        Number.isFinite(row.rank),
    )
    .slice(0, 200);
  const heroPowerRows = (body?.heroPowerRows ?? [])
    .filter(
      (row) =>
        row.playerName &&
        Number.isFinite(row.heroPower) &&
        Number.isFinite(row.serverRank),
    )
    .slice(0, 200);
  if (captureDate && arenaRows.length)
    await env.DB.batch(
      arenaRows.map((row) =>
        env.DB.prepare(
          `INSERT INTO arena_rankings (capture_date, player_name, score, squad_power, server_rank, captured_at)
    VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(capture_date, player_name) DO UPDATE SET score=excluded.score, squad_power=excluded.squad_power, server_rank=excluded.server_rank, captured_at=excluded.captured_at`,
        ).bind(
          captureDate,
          playerName(row.playerName),
          Math.round(row.score ?? 0),
          numberValue(row.squadPower),
          Math.round(row.rank ?? 0),
          capturedAt,
        ),
      ),
    );
  if (captureDate && heroPowerRows.length)
    await env.DB.batch(
      heroPowerRows.map((row) =>
        env.DB.prepare(
          `INSERT INTO hero_power_rankings (capture_date, player_name, hero_power, server_rank, captured_at)
    VALUES (?, ?, ?, ?, ?) ON CONFLICT(capture_date, player_name) DO UPDATE SET hero_power=excluded.hero_power, server_rank=excluded.server_rank, captured_at=excluded.captured_at`,
        ).bind(
          captureDate,
          playerName(row.playerName),
          Math.round(row.heroPower ?? 0),
          Math.round(row.serverRank ?? 0),
          capturedAt,
        ),
      ),
    );
  return NextResponse.json({
    ok: true,
    imported: rows.length,
    historyImported: historyRows.length,
    vsImported: vsRows.length,
    arenaImported: arenaRows.length,
    heroPowerImported: heroPowerRows.length,
  });
}
