import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { env } from 'cloudflare:workers';
import { getMemberAccess, listPlayers, syncMember } from '@/lib/member-access';
import { Portal } from './portal';
import { Onboarding } from './onboarding';

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const session = await getSession();
  if (!session) redirect('/');
  await syncMember(session);
  const [access, players] = await Promise.all([getMemberAccess(session.discordId), listPlayers()]);
  if (!access.isAdmin && access.status !== 'approved') return <Onboarding member={session} players={players} status={access.status} />;
  const pendingClaims = access.isAdmin ? (await env.DB.prepare(`SELECT c.discord_id, m.display_name, m.discord_username, c.lwma_player_id, p.player_name, c.requested_at
    FROM identity_claims c JOIN members m ON m.discord_id=c.discord_id JOIN alliance_players p ON p.lwma_player_id=c.lwma_player_id
    WHERE c.status='pending' ORDER BY c.requested_at`).all<Record<string, unknown>>()).results.map((row) => ({
      discordId: String(row.discord_id), discordName: String(row.display_name ?? row.discord_username ?? row.discord_id),
      lwmaPlayerId: String(row.lwma_player_id), playerName: String(row.player_name), requestedAt: Number(row.requested_at),
    })) : [];
  return <Portal member={session} access={access} players={players} pendingClaims={pendingClaims} />;
}
