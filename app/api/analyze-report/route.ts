import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

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
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: 'Battle analysis is ready but the AI key has not been configured yet.' }, { status: 503 });
  const form = await request.formData();
  const report = form.get('report');
  if (!(report instanceof File)) return NextResponse.json({ error: 'Choose a battle-report image.' }, { status: 400 });
  if (!['image/png','image/jpeg','image/webp'].includes(report.type) || report.size > 8_000_000) return NextResponse.json({ error: 'Use a PNG, JPG or WebP smaller than 8 MB.' }, { status: 400 });
  const bytes = new Uint8Array(await report.arrayBuffer());
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-5.6-luna',
      store: false,
      max_output_tokens: 900,
      safety_identifier: `oopz_${session.discordId}`,
      instructions: 'You are the OOPZ battle analyst for Last War: Survival. Read only what is visible in the report. Be concise and practical. Return four sections: What happened, Biggest gap, Three next actions, and What not to spend on. Clearly mark uncertainty and never invent missing stats.',
      input: [{ role: 'user', content: [{ type: 'input_text', text: 'Analyze this battle report and give personalized improvement priorities.' }, { type: 'input_image', image_url: imageDataUrl(bytes, report.type), detail: 'high' }] }],
    }),
  });
  if (!response.ok) return NextResponse.json({ error: 'The AI service could not analyze this report right now.' }, { status: 502 });
  const result = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  return NextResponse.json({ analysis: extractOutputText(result) || 'No readable analysis was returned.' });
}
