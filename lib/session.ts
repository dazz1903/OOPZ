import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'oopz_session';

export type OopzSession = {
  discordId: string;
  username: string;
  displayName: string;
  avatar: string | null;
  roles: string[];
  expires: number;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let raw = '';
  for (const byte of bytes) raw += String.fromCharCode(byte);
  return btoa(raw).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - value.length % 4) % 4);
  const raw = atob(padded);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

async function signingKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not configured');
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createSessionToken(session: OopzSession): Promise<string> {
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(session)));
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), new TextEncoder().encode(payload));
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

export async function readSessionToken(token: string | undefined): Promise<OopzSession | null> {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  try {
    const valid = await crypto.subtle.verify('HMAC', await signingKey(), base64UrlToBytes(signature), new TextEncoder().encode(payload));
    if (!valid) return null;
    const session = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload))) as OopzSession;
    return session.expires > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<OopzSession | null> {
  return readSessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}
