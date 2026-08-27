import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

function bounded(value: unknown, min: number, max: number) { return Math.min(max, Math.max(min, Math.round(Number(value) || 0))); }

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error:'Sign in required.' }, { status:401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error:'Invalid profile.' }, { status:400 });
  const rawTech = body.techProgress && typeof body.techProgress === 'object' ? body.techProgress as Record<string, unknown> : {};
  const techProgress = Object.fromEntries(Object.entries(rawTech).slice(0,100).map(([key,value]) => [key, bounded(value,0,10)]));
  const rawBuildings = body.buildingLevels && typeof body.buildingLevels === 'object' ? body.buildingLevels as Record<string,unknown> : {};
  const buildingLevels = Object.fromEntries(Object.entries(rawBuildings).slice(0,40).map(([key,value])=>[key,bounded(value,0,35)]));
  const now = Date.now();
  const vehicleCenter=['Tank','Air','Missile'].includes(String(body.vehicleCenter))?String(body.vehicleCenter):'Tank';
  await env.DB.prepare(`INSERT INTO commander_progress (discord_id,hq_level,tech_center_level,barracks_level,research_speed,construction_speed,food,iron,gold,valor,tech_center_count,worker_count,vehicle_center,building_levels_json,tech_progress_json,updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(discord_id) DO UPDATE SET hq_level=excluded.hq_level,tech_center_level=excluded.tech_center_level,barracks_level=excluded.barracks_level,research_speed=excluded.research_speed,construction_speed=excluded.construction_speed,food=excluded.food,iron=excluded.iron,gold=excluded.gold,valor=excluded.valor,tech_center_count=excluded.tech_center_count,worker_count=excluded.worker_count,vehicle_center=excluded.vehicle_center,building_levels_json=excluded.building_levels_json,tech_progress_json=excluded.tech_progress_json,updated_at=excluded.updated_at`)
    .bind(session.discordId,bounded(body.hqLevel,1,35),bounded(body.techCenterLevel,1,35),bounded(body.barracksLevel,1,35),bounded(body.researchSpeed,0,1000),bounded(body.constructionSpeed,0,1000),bounded(body.food,0,100_000_000_000),bounded(body.iron,0,100_000_000_000),bounded(body.gold,0,100_000_000_000),bounded(body.valor,0,10_000_000),bounded(body.techCenterCount,1,2),bounded(body.workerCount,1,4),vehicleCenter,JSON.stringify(buildingLevels),JSON.stringify(techProgress),now).run();
  return NextResponse.json({ ok:true, updatedAt:now });
}
