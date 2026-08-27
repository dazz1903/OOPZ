import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { env } from 'cloudflare:workers';
import { getMemberAccess, listCurrentArena, listCurrentHeroPower, listCurrentVsScores, listPlayers, syncMember } from '@/lib/member-access';
import { Portal } from './portal';
import { Onboarding } from './onboarding';
import { getCommanderProgress } from '@/lib/commander-progress';

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const session = await getSession();
  if (!session) redirect('/');
  await syncMember(session);
  const [access, players, vsScores, arena, heroPower, progress] = await Promise.all([getMemberAccess(session.discordId), listPlayers(), listCurrentVsScores(), listCurrentArena(), listCurrentHeroPower(), getCommanderProgress(session.discordId)]);
  if (!access.isAdmin && access.status !== 'approved') return <Onboarding member={session} players={players} status={access.status} />;
  const pendingClaims = access.isAdmin ? (await env.DB.prepare(`SELECT c.discord_id, m.display_name, m.discord_username, c.lwma_player_id, p.player_name, c.requested_at
    FROM identity_claims c JOIN members m ON m.discord_id=c.discord_id JOIN alliance_players p ON p.lwma_player_id=c.lwma_player_id
    WHERE c.status='pending' ORDER BY c.requested_at`).all<Record<string, unknown>>()).results.map((row) => ({
      discordId: String(row.discord_id), discordName: String(row.display_name ?? row.discord_username ?? row.discord_id),
      lwmaPlayerId: String(row.lwma_player_id), playerName: String(row.player_name), requestedAt: Number(row.requested_at),
    })) : [];
  const linkedMembers = access.isAdmin ? (await env.DB.prepare(`SELECT m.discord_id,m.discord_username,m.display_name,m.verification_status,m.lwma_player_id,p.player_name FROM members m LEFT JOIN alliance_players p ON p.lwma_player_id=m.lwma_player_id ORDER BY CASE WHEN m.verification_status='approved' THEN 0 ELSE 1 END,m.display_name`).all<Record<string,unknown>>()).results.map(row=>({discordId:String(row.discord_id),discordName:String(row.display_name??row.discord_username??row.discord_id),status:String(row.verification_status),lwmaPlayerId:row.lwma_player_id?String(row.lwma_player_id):null,playerName:row.player_name?String(row.player_name):null})) : [];
  const progressLeague = (await env.DB.prepare(`SELECT p.player_name,c.hq_level,c.tech_center_level,c.barracks_level,c.research_speed,c.tech_center_count,c.worker_count,c.building_levels_json,c.tech_progress_json,c.updated_at FROM commander_progress c JOIN members m ON m.discord_id=c.discord_id JOIN alliance_players p ON p.lwma_player_id=m.lwma_player_id WHERE m.verification_status='approved' ORDER BY c.hq_level DESC,c.tech_center_level DESC`).all<Record<string,unknown>>()).results.map(row=>({playerName:String(row.player_name),hqLevel:Number(row.hq_level),techCenterLevel:Number(row.tech_center_level),barracksLevel:Number(row.barracks_level),researchSpeed:Number(row.research_speed),techCenterCount:Number(row.tech_center_count??1),workerCount:Number(row.worker_count??2),buildingLevels:JSON.parse(String(row.building_levels_json??'{}')) as Record<string,number>,techProgress:JSON.parse(String(row.tech_progress_json??'{}')) as Record<string,number>,updatedAt:Number(row.updated_at)}));
  return <Portal member={session} access={access} players={players} vsScores={vsScores} arena={arena} heroPower={heroPower} progress={progress} progressLeague={progressLeague} pendingClaims={pendingClaims} linkedMembers={linkedMembers} />;
}
