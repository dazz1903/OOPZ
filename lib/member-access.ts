import { env } from 'cloudflare:workers';
import type { OopzSession } from './session';

export type PlayerRecord = {
  lwmaPlayerId: string; playerName: string; power: number; level: number | null;
  allianceRank: string | null; kills: number | null; todayDonations: number | null;
  weeklyDonations: number | null; capturedAt: number;
};

export type MemberAccess = {
  isAdmin: boolean;
  status: 'unlinked' | 'pending' | 'approved' | 'rejected';
  player: PlayerRecord | null;
};

export type VsScoreRecord = { weekStart: string; playerName: string; points: number; rank: number; capturedAt: number };

export function configuredAdmin(discordId: string) {
  return (process.env.DISCORD_ADMIN_USER_IDS ?? '').split(',').map((id) => id.trim()).filter(Boolean).includes(discordId);
}

export async function syncMember(session: OopzSession) {
  const admin = configuredAdmin(session.discordId);
  const now = Date.now();
  await env.DB.prepare(`
    INSERT INTO members (discord_id, discord_username, display_name, player_name, role, verification_status, active, joined_at)
    VALUES (?, ?, ?, NULL, ?, 'unlinked', 1, ?)
    ON CONFLICT(discord_id) DO UPDATE SET discord_username=excluded.discord_username, display_name=excluded.display_name, active=1,
      role=CASE WHEN excluded.role='admin' THEN 'admin' ELSE members.role END
  `).bind(session.discordId, session.username, session.displayName, admin ? 'admin' : 'member', now).run();
}

export async function getMemberAccess(discordId: string): Promise<MemberAccess> {
  const row = await env.DB.prepare(`
    SELECT m.role, m.verification_status, p.lwma_player_id, p.player_name, p.power, p.level, p.alliance_rank,
      p.kills, p.today_donations, p.weekly_donations, p.captured_at
    FROM members m LEFT JOIN alliance_players p ON p.lwma_player_id=m.lwma_player_id
    WHERE m.discord_id=? AND m.active=1
  `).bind(discordId).first<Record<string, unknown>>();
  const isAdmin = configuredAdmin(discordId) || row?.role === 'admin';
  const status = (row?.verification_status as MemberAccess['status']) ?? 'unlinked';
  const player = row?.lwma_player_id ? {
    lwmaPlayerId: String(row.lwma_player_id), playerName: String(row.player_name), power: Number(row.power ?? 0),
    level: row.level == null ? null : Number(row.level), allianceRank: row.alliance_rank == null ? null : String(row.alliance_rank),
    kills: row.kills == null ? null : Number(row.kills), todayDonations: row.today_donations == null ? null : Number(row.today_donations),
    weeklyDonations: row.weekly_donations == null ? null : Number(row.weekly_donations), capturedAt: Number(row.captured_at ?? 0),
  } : null;
  return { isAdmin, status, player };
}

export async function listPlayers() {
  const result = await env.DB.prepare(`SELECT lwma_player_id, player_name, power, level, alliance_rank, kills, today_donations, weekly_donations, captured_at
    FROM alliance_players WHERE active=1 ORDER BY power DESC`).all<Record<string, unknown>>();
  return result.results.map((row) => ({
    lwmaPlayerId: String(row.lwma_player_id), playerName: String(row.player_name), power: Number(row.power ?? 0),
    level: row.level == null ? null : Number(row.level), allianceRank: row.alliance_rank == null ? null : String(row.alliance_rank),
    kills: row.kills == null ? null : Number(row.kills), todayDonations: row.today_donations == null ? null : Number(row.today_donations),
    weeklyDonations: row.weekly_donations == null ? null : Number(row.weekly_donations), capturedAt: Number(row.captured_at ?? 0),
  })) satisfies PlayerRecord[];
}

export async function listCurrentVsScores() {
  const latest = await env.DB.prepare('SELECT MAX(week_start) AS week_start FROM vs_scores').first<{ week_start: string | null }>();
  if (!latest?.week_start) return [] as VsScoreRecord[];
  const result = await env.DB.prepare('SELECT week_start, player_name, points, rank, captured_at FROM vs_scores WHERE week_start=? ORDER BY rank').bind(latest.week_start).all<Record<string, unknown>>();
  return result.results.map((row) => ({ weekStart: String(row.week_start), playerName: String(row.player_name), points: Number(row.points), rank: Number(row.rank), capturedAt: Number(row.captured_at) })) satisfies VsScoreRecord[];
}
