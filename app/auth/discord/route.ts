import { NextRequest, NextResponse } from 'next/server';

const STATE_COOKIE = 'oopz_oauth_state';
const VERIFIER_COOKIE = 'oopz_oauth_verifier';

function randomBase64Url(length = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let raw = '';
  for (const byte of bytes) raw += String.fromCharCode(byte);
  return btoa(raw).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

async function challengeFor(verifier: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  let raw = '';
  for (const byte of new Uint8Array(digest)) raw += String.fromCharCode(byte);
  return btoa(raw).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

export async function GET(request: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  if (!clientId) return NextResponse.redirect(new URL('/?error=discord-not-configured', request.url));

  const state = randomBase64Url();
  const verifier = randomBase64Url(48);
  const appUrl = process.env.APP_URL ?? request.nextUrl.origin;
  const redirectUri = `${appUrl}/auth/discord/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'identify guilds.members.read',
    state,
    code_challenge: await challengeFor(verifier),
    code_challenge_method: 'S256',
    prompt: 'consent',
  });
  const response = NextResponse.redirect(`https://discord.com/oauth2/authorize?${params}`);
  const cookie = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, maxAge: 600, path: '/auth/discord' };
  response.cookies.set(STATE_COOKIE, state, cookie);
  response.cookies.set(VERIFIER_COOKIE, verifier, cookie);
  return response;
}
