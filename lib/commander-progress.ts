import { env } from 'cloudflare:workers';

export type CommanderProgress = {
  hqLevel: number; techCenterLevel: number; barracksLevel: number;
  researchSpeed: number; constructionSpeed: number;
  food: number; iron: number; gold: number; valor: number;
  techCenterCount:number; workerCount:number; buildingLevels:Record<string,number>;
  vehicleCenter:'Tank'|'Air'|'Missile'; heroProfile:Record<string,unknown>; droneProfile:Record<string,unknown>;
  techProgress: Record<string, number>; updatedAt: number | null;
};

export const emptyProgress: CommanderProgress = { hqLevel:1, techCenterLevel:1, barracksLevel:1, researchSpeed:0, constructionSpeed:0, food:0, iron:0, gold:0, valor:0, techCenterCount:1, workerCount:2, vehicleCenter:'Tank', buildingLevels:{}, techProgress:{}, heroProfile:{}, droneProfile:{}, updatedAt:null };

export async function getCommanderProgress(discordId: string): Promise<CommanderProgress> {
  const row = await env.DB.prepare('SELECT * FROM commander_progress WHERE discord_id=?').bind(discordId).first<Record<string, unknown>>();
  if (!row) return emptyProgress;
  let techProgress: Record<string, number> = {};
  let buildingLevels: Record<string, number> = {};
  let heroProfile: Record<string,unknown> = {}; let droneProfile:Record<string,unknown> = {};
  try { techProgress = JSON.parse(String(row.tech_progress_json ?? '{}')) as Record<string, number>; } catch {}
  try { buildingLevels = JSON.parse(String(row.building_levels_json ?? '{}')) as Record<string, number>; } catch {}
  try { heroProfile=JSON.parse(String(row.hero_profile_json??'{}')) as Record<string,unknown>; } catch {} try { droneProfile=JSON.parse(String(row.drone_profile_json??'{}')) as Record<string,unknown>; } catch {}
  const vehicle=String(row.vehicle_center??'Tank');
  return { hqLevel:Number(row.hq_level), techCenterLevel:Number(row.tech_center_level), barracksLevel:Number(row.barracks_level), researchSpeed:Number(row.research_speed), constructionSpeed:Number(row.construction_speed), food:Number(row.food), iron:Number(row.iron), gold:Number(row.gold), valor:Number(row.valor), techCenterCount:Number(row.tech_center_count??1), workerCount:Number(row.worker_count??2), vehicleCenter:(['Tank','Air','Missile'].includes(vehicle)?vehicle:'Tank') as CommanderProgress['vehicleCenter'], buildingLevels, techProgress, heroProfile, droneProfile, updatedAt:Number(row.updated_at) };
}
