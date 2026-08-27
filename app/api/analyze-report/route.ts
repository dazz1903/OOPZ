import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';
import { getSession } from '@/lib/session';
import { getMemberAccess } from '@/lib/member-access';

function imageDataUrl(bytes: Uint8Array, mime: string) {
  let raw = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) raw += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return `data:${mime};base64,${btoa(raw)}`;
}

function extractOutputText(payload: { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }) {
  if (payload.output_text) return payload.output_text;
  return payload.output?.flatMap((item) => item.content ?? []).filter((item) => item.type === 'output_text').map((item) => item.text ?? '').join('\n') ?? '';
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Sign in with Discord first.' }, { status: 401 });
  const access = await getMemberAccess(session.discordId);
  if (!access.isAdmin && access.status !== 'approved') return NextResponse.json({ error: 'Your in-game commander must be approved before using battle analysis.' }, { status: 403 });
  if (!env.OPENAI_API_KEY) return NextResponse.json({ error: 'Battle analysis is ready but the AI key has not been configured yet.' }, { status: 503 });
  const member = await env.DB.prepare('SELECT id FROM members WHERE discord_id=? AND active=1').bind(session.discordId).first<{ id: number }>();
  if (!member) return NextResponse.json({ error: 'Your member record could not be found.' }, { status: 403 });
  const form = await request.formData();
  const reports = form.getAll('reports').filter((value): value is File => value instanceof File && value.size > 0);
  if (!reports.length || reports.length > 5) return NextResponse.json({ error: 'Choose between 1 and 5 battle-report screenshots.' }, { status: 400 });
  if (reports.some((report) => !['image/png','image/jpeg','image/webp'].includes(report.type) || report.size > 8_000_000)) return NextResponse.json({ error: 'Each screenshot must be a PNG, JPG or WebP smaller than 8 MB.' }, { status: 400 });
  if (reports.reduce((total, report) => total + report.size, 0) > 30_000_000) return NextResponse.json({ error: 'The combined screenshots must be smaller than 30 MB.' }, { status: 400 });
  const now = new Date();
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
  const weekKey = monday.toISOString().slice(0, 10);
  const reservation = await env.DB.prepare("INSERT OR IGNORE INTO battle_analysis_usage (member_id, week_key, status, created_at) VALUES (?, ?, 'processing', ?)").bind(member.id, weekKey, Date.now()).run();
  if (!reservation.meta.changes) return NextResponse.json({ error: 'You have already used your battle-report analysis for this week. Your next analysis becomes available on Monday.' }, { status: 429 });
  const imageInputs = await Promise.all(reports.map(async (report) => ({ type: 'input_image', image_url: imageDataUrl(new Uint8Array(await report.arrayBuffer()), report.type), detail: 'high' })));
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: env.OPENAI_MODEL ?? 'gpt-5.6-luna',
      store: false,
      max_output_tokens: 900,
      safety_identifier: `oopz_${session.discordId}`,
      instructions: 'You are the OOPZ battle analyst for Last War: Survival. Read only what is visible in the report. Be concise and practical. Return four sections: What happened, Biggest gap, Three next actions, and What not to spend on. Clearly mark uncertainty and never invent missing stats.',
      input: [{ role: 'user', content: [{ type: 'input_text', text: `Analyze these ${reports.length} screenshots as one battle report and give personalized improvement priorities. Verified commander context: ${access.player ? `${access.player.playerName}, power ${access.player.power}, HQ ${access.player.level ?? 'unknown'}, kills ${access.player.kills ?? 'unknown'}` : 'OOPZ administrator without a linked commander'}.` }, ...imageInputs] }],
    }),
  });
  if (!response.ok) {
    await env.DB.prepare('DELETE FROM battle_analysis_usage WHERE member_id=? AND week_key=?').bind(member.id, weekKey).run();
    const failure = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    return NextResponse.json({ error: failure?.error?.message ?? 'The AI service could not analyze this report right now.' }, { status: 502 });
  }
  const result = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  const analysis = extractOutputText(result) || 'No readable analysis was returned.';
  await env.DB.batch([
    env.DB.prepare("UPDATE battle_analysis_usage SET status='analyzed' WHERE member_id=? AND week_key=?").bind(member.id, weekKey),
    env.DB.prepare("INSERT INTO battle_reports (member_id, object_key, status, analysis, created_at) VALUES (?, ?, 'analyzed', ?, ?)").bind(member.id, `openai:${weekKey}`, analysis, Date.now()),
  ]);
  return NextResponse.json({ analysis, nextAvailable: new Date(monday.getTime() + 7 * 86400000).toISOString() });
}
