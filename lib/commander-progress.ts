import { env } from 'cloudflare:workers';

export type CommanderProgress = {
  hqLevel: number; techCenterLevel: number; barracksLevel: number;
  researchSpeed: number; constructionSpeed: number;
  food: number; iron: number; gold: number; valor: number;
  techProgress: Record<string, number>; updatedAt: number | null;
};

export const emptyProgress: CommanderProgress = { hqLevel:1, techCenterLevel:1, barracksLevel:1, researchSpeed:0, constructionSpeed:0, food:0, iron:0, gold:0, valor:0, techProgress:{}, updatedAt:null };

export async function getCommanderProgress(discordId: string): Promise<CommanderProgress> {
  const row = await env.DB.prepare('SELECT * FROM commander_progress WHERE discord_id=?').bind(discordId).first<Record<string, unknown>>();
  if (!row) return emptyProgress;
  let techProgress: Record<string, number> = {};
  try { techProgress = JSON.parse(String(row.tech_progress_json ?? '{}')) as Record<string, number>; } catch {}
  return { hqLevel:Number(row.hq_level), techCenterLevel:Number(row.tech_center_level), barracksLevel:Number(row.barracks_level), researchSpeed:Number(row.research_speed), constructionSpeed:Number(row.construction_speed), food:Number(row.food), iron:Number(row.iron), gold:Number(row.gold), valor:Number(row.valor), techProgress, updatedAt:Number(row.updated_at) };
}
