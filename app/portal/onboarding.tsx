'use client';

import { useState } from 'react';
import type { OopzSession } from '@/lib/session';
import type { PlayerRecord } from '@/lib/member-access';

export function Onboarding({ member, players, status }: { member: OopzSession; players: PlayerRecord[]; status: string }) {
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState(status === 'pending' ? 'Your commander claim is waiting for an OOPZ admin.' : status === 'rejected' ? 'Your previous claim was rejected. Choose the correct commander and try again.' : '');
  const [sending, setSending] = useState(false);
  async function claim() {
    if (!selected) return;
    setSending(true);
    const response = await fetch('/api/claims', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lwmaPlayerId: selected }) });
    const result = await response.json() as { error?: string; playerName?: string };
    setMessage(result.error ?? `Claim for ${result.playerName} submitted. An OOPZ admin must approve it.`);
    setSending(false);
  }
  return <main className="min-h-screen bg-[#080b12] px-5 py-12 text-white"><div className="mx-auto max-w-2xl rounded-3xl border border-[#252c3d] bg-[#0f1420] p-7 sm:p-10">
    <p className="text-xs font-black uppercase tracking-[.16em] text-[#66efb1]">Discord membership verified</p>
    <h1 className="mt-3 text-4xl font-black tracking-[-.04em]">Link your commander.</h1>
    <p className="mt-4 leading-7 text-[#929bb0]">Welcome, {member.displayName}. Choose your exact in-game name from the current alliance roster. Your personal statistics remain locked until an OOPZ admin approves the match.</p>
    <label className="mt-8 block text-sm font-black" htmlFor="commander">In-game commander</label>
    <select id="commander" value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-3 w-full rounded-xl border border-[#343c4f] bg-[#151b28] px-4 py-4 text-white">
      <option value="">Select your commander…</option>{players.map((player) => <option key={player.lwmaPlayerId} value={player.lwmaPlayerId}>{player.playerName} · HQ {player.level ?? '?'} · {(player.power / 1_000_000).toFixed(1)}M</option>)}
    </select>
    <button onClick={claim} disabled={!selected || sending} className="mt-4 w-full rounded-xl bg-[#7c5cff] px-5 py-4 font-black disabled:opacity-40">{sending ? 'Submitting…' : 'Request verification'}</button>
    {message && <p className="mt-5 rounded-xl border border-[#4a4027] bg-[#211c11] p-4 text-sm text-[#e2c477]">{message}</p>}
    <p className="mt-6 text-xs leading-5 text-[#69738a]">Discord names are not trusted as game identity. Approval creates a unique one-to-one link that another member cannot claim.</p>
    <a href="/auth/logout" className="mt-7 inline-block text-sm font-bold text-[#8d75ff]">Sign out</a>
  </div></main>;
}
