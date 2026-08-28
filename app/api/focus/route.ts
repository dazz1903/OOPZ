import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMemberAccess } from "@/lib/member-access";
export async function POST(request: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  if ((await getMemberAccess(session.discordId)).isObserver)
    return NextResponse.json(
      { error: "Observer access is read-only." },
      { status: 403 },
    );
  const body = (await request.json().catch(() => null)) as {
    focus?: string;
  } | null;
  const focus = body?.focus;
  if (!focus || !["Tank", "Air", "Missile"].includes(focus))
    return NextResponse.json(
      { error: "Choose Tank, Air or Missile." },
      { status: 400 },
    );
  await env.DB.prepare(
    "INSERT INTO commander_progress (discord_id,vehicle_center,updated_at) VALUES (?,?,?) ON CONFLICT(discord_id) DO UPDATE SET vehicle_center=excluded.vehicle_center,updated_at=excluded.updated_at",
  )
    .bind(session.discordId, focus, Date.now())
    .run();
  return NextResponse.json({ ok: true, focus });
}
