import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE } from '@/lib/session';

type DiscordUser = { id: string; username: string; global_name?: string | null; avatar?: string | null };
type DiscordMember = { roles: string[]; nick?: string | null; pending?: boolean };

function failed(request: NextRequest, reason: string) {
  return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(reason)}`, request.url));
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const savedState = request.cookies.get('oopz_oauth_state')?.value;
  const verifier = request.cookies.get('oopz_oauth_verifier')?.value;
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const guildId = process.env.DISCORD_GUILD_ID;
  if (!code || !state || state !== savedState || !verifier) return failed(request, 'invalid-oauth-state');
  if (!clientId || !clientSecret || !guildId || !process.env.AUTH_SECRET) return failed(request, 'discord-not-configured');

  const appUrl = process.env.APP_URL ?? request.nextUrl.origin;
  const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: clientId, client_secret: clientSecret, grant_type: 'authorization_code', code, redirect_uri: `${appUrl}/auth/discord/callback`, code_verifier: verifier }),
  });
  if (!tokenResponse.ok) return failed(request, 'discord-token-failed');
  const token = await tokenResponse.json() as { access_token: string };
  const headers = { Authorization: `Bearer ${token.access_token}` };
  const [userResponse, memberResponse] = await Promise.all([
    fetch('https://discord.com/api/v10/users/@me', { headers }),
    fetch(`https://discord.com/api/v10/users/@me/guilds/${guildId}/member`, { headers }),
  ]);
  if (!userResponse.ok || !memberResponse.ok) return failed(request, 'not-an-oopz-member');
  const user = await userResponse.json() as DiscordUser;
  const member = await memberResponse.json() as DiscordMember;
  if (member.pending) return failed(request, 'finish-discord-screening');
  const allowedRoles = (process.env.DISCORD_ALLOWED_ROLE_IDS ?? '').split(',').map((role) => role.trim()).filter(Boolean);
  if (allowedRoles.length && !member.roles.some((role) => allowedRoles.includes(role))) return failed(request, 'missing-discord-role');

  const expires = Date.now() + 12 * 60 * 60 * 1000;
  const sessionToken = await createSessionToken({ discordId: user.id, username: user.username, displayName: member.nick ?? user.global_name ?? user.username, avatar: user.avatar ?? null, roles: member.roles, expires });
  const response = NextResponse.redirect(new URL('/portal', appUrl));
  response.cookies.set(SESSION_COOKIE, sessionToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', expires: new Date(expires) });
  response.cookies.delete('oopz_oauth_state');
  response.cookies.delete('oopz_oauth_verifier');
  return response;
}
