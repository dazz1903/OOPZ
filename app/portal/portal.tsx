'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { OopzSession } from '@/lib/session';
import type { MemberAccess, PlayerRecord, VsScoreRecord } from '@/lib/member-access';
import { scoreItems, type Focus } from '@/lib/game-data/deals-db';

type Tab = 'personal' | 'alliance' | 'compare' | 'reports' | 'purchases' | 'guides' | 'admin';
const baseNav: [Tab, string, string][] = [['personal','⌂','Personal'],['alliance','◉','Alliance'],['compare','↕','Compare'],['reports','◇','Battle lab'],['purchases','€','Purchase engine'],['guides','≡','Guides']];
type Claim = { discordId: string; discordName: string; lwmaPlayerId: string; playerName: string; requestedAt: number };
function compact(value: number | null | undefined) { return value == null ? '—' : new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value); }

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-[#252c3d] bg-[#111722] p-5"><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#66718a]">{label}</p><p className="mt-3 text-3xl font-black">{value}</p><p className="mt-2 text-xs text-[#66efb1]">{note}</p></div>;
}

export function Portal({ member, access, players, vsScores, pendingClaims }: { member: OopzSession; access: MemberAccess; players: PlayerRecord[]; vsScores: VsScoreRecord[]; pendingClaims: Claim[] }) {
  const [tab, setTab] = useState<Tab>('personal');
  const [focus, setFocus] = useState<Focus>('Balanced');
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [claims, setClaims] = useState(pendingClaims);
  const [selectedCommander, setSelectedCommander] = useState('');
  const [linkMessage, setLinkMessage] = useState('');
  const [linking, setLinking] = useState(false);
  const nav = access.isAdmin ? [...baseNav, ['admin','⚙','Admin'] as [Tab,string,string]] : baseNav;
  const player = access.player;
  const myVs = player ? vsScores.find((score) => score.playerName === player.playerName) : undefined;
  const rankedVs = [...vsScores].sort((a, b) => a.points - b.points);
  const allianceMedianVs = rankedVs.length ? rankedVs[Math.floor((rankedVs.length - 1) / 2)].points : 0;
  const peerNames = player ? new Set(players.filter((item) => item.power >= player.power * .8 && item.power <= player.power * 1.2).map((item) => item.playerName)) : new Set<string>();
  const peerVs = rankedVs.filter((score) => peerNames.has(score.playerName));
  const peerTargetVs = peerVs.length ? peerVs[Math.floor((peerVs.length - 1) / 2)].points : allianceMedianVs;
  const vsGap = myVs ? Math.max(0, peerTargetVs - myVs.points) : 0;
  const vsPercentile = myVs && vsScores.length > 1 ? Math.round((vsScores.length - myVs.rank) / (vsScores.length - 1) * 100) : 0;
  const totalPower = players.reduce((sum, item) => sum + item.power, 0);
  const averageLevel = players.length ? players.reduce((sum, item) => sum + (item.level ?? 0), 0) / players.length : 0;
  const recommendations = useMemo(() => scoreItems(focus, 'free').slice(0, 8), [focus]);

  async function analyzeReport(event: FormEvent) {
    event.preventDefault();
    if (!reportFiles.length) return;
    setAnalyzing(true); setAnalysis('');
    const body = new FormData(); reportFiles.forEach((file) => body.append('reports', file));
    try {
      const response = await fetch('/api/analyze-report', { method: 'POST', body });
      const result = await response.json() as { analysis?: string; error?: string };
      setAnalysis(result.analysis ?? result.error ?? 'Analysis failed.');
    } catch { setAnalysis('The analyzer could not be reached.'); }
    finally { setAnalyzing(false); }
  }

  async function decide(discordId: string, action: 'approve' | 'reject') {
    const response = await fetch('/api/admin/claims', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ discordId, action }) });
    if (response.ok) setClaims((current) => current.filter((claim) => claim.discordId !== discordId));
  }

  async function linkCommander() {
    if (!selectedCommander) return;
    setLinking(true); setLinkMessage('');
    const response = await fetch('/api/claims', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lwmaPlayerId: selectedCommander }) });
    const result = await response.json() as { error?: string; playerName?: string; approved?: boolean };
    if (!response.ok) setLinkMessage(result.error ?? 'Commander linking failed.');
    else if (result.approved) { setLinkMessage(`${result.playerName} linked.`); window.location.reload(); }
    else setLinkMessage(`Claim for ${result.playerName} submitted for approval.`);
    setLinking(false);
  }

  return <main className="min-h-screen bg-[#080b12] text-white lg:grid lg:grid-cols-[246px_1fr]">
    <aside className="border-b border-[#222838] bg-[#0b0f18] p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-5">
      <div className="flex items-center justify-between lg:block"><div className="flex items-center gap-3 px-2 lg:mb-10"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7c5cff] text-xs font-black">OP</span><div><p className="font-black tracking-[.16em]">OOPZ</p><p className="text-[10px] text-[#626d87]">ALLIANCE COMMAND</p></div></div><a href="/auth/logout" className="text-xs font-bold text-[#677188] hover:text-white lg:absolute lg:bottom-7 lg:left-7">Sign out</a></div>
      <nav className="mt-4 flex gap-2 overflow-x-auto lg:mt-0 lg:block lg:space-y-2">{nav.map(([id, icon, label]) => <button key={id} onClick={() => setTab(id)} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition lg:w-full ${tab === id ? 'bg-[#7c5cff] text-white' : 'text-[#8a94aa] hover:bg-[#141a27] hover:text-white'}`}><span className="w-5 text-center">{icon}</span>{label}</button>)}</nav>
    </aside>

    <section className="min-w-0"><header className="flex items-center justify-between border-b border-[#222838] px-5 py-5 sm:px-8"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#66718a]">Verified Discord member</p><p className="mt-1 font-black">{member.displayName}</p></div><div className="flex items-center gap-3"><span className="hidden rounded-full bg-[#14261f] px-3 py-2 text-xs font-bold text-[#66efb1] sm:block">● OOPZ online</span>{member.avatar ? <img className="h-10 w-10 rounded-full" alt="Discord avatar" src={`https://cdn.discordapp.com/avatars/${member.discordId}/${member.avatar}.png?size=80`} /> : <span className="grid h-10 w-10 place-items-center rounded-full bg-[#7c5cff] font-black">{member.displayName.slice(0,2).toUpperCase()}</span>}</div></header>
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <p className="mb-6 rounded-xl border border-[#314436] bg-[#122019] px-4 py-3 text-xs text-[#85dcae]">{players.length ? `${players.length} LWMA alliance records connected.` : 'The LWMA roster has not been imported yet.'}{access.isAdmin && !player ? ' Admin access is active; link your commander when ready.' : ''}</p>

        {tab === 'personal' && <><p className="text-sm font-black text-[#8d75ff]">PERSONAL OVERVIEW</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">{player ? player.playerName : 'Link your commander.'}</h1><div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Account power" value={compact(player?.power)} note={player ? `#${players.findIndex((item) => item.lwmaPlayerId === player.lwmaPlayerId) + 1} in alliance power` : 'Awaiting identity link'} /><Stat label="Weekly VS" value={compact(myVs?.points)} note={myVs ? `#${myVs.rank} · ${vsPercentile}th percentile` : 'Awaiting weekly score'} /><Stat label="Peer target" value={compact(peerTargetVs || null)} note={myVs && !vsGap ? 'On target for your power group' : myVs ? `${compact(vsGap)} points to target` : 'Median of similarly powered peers'} /><Stat label="Weekly donations" value={compact(player?.weeklyDonations)} note="Latest LWMA capture" /></div><div className="mt-6 grid gap-5 xl:grid-cols-[1.3fr_.7fr]"><article className="rounded-3xl border border-[#252c3d] bg-[#0f1420] p-6"><p className="text-xs font-black tracking-[.15em] text-[#68728b]">IDENTITY STATUS</p><p className="mt-5 text-lg font-black">{player ? 'Verified one-to-one commander link' : 'Choose your in-game commander'}</p><p className="mt-2 text-sm leading-6 text-[#7e889f]">Discord membership is checked at every login. Regular member claims require administrator approval.</p>{!player && <div className="mt-5"><select aria-label="In-game commander" value={selectedCommander} onChange={(event) => setSelectedCommander(event.target.value)} className="w-full rounded-xl border border-[#343c4f] bg-[#151b28] px-4 py-3 text-white"><option value="">Select your commander…</option>{players.map((item) => <option key={item.lwmaPlayerId} value={item.lwmaPlayerId}>{item.playerName} · HQ {item.level ?? '?'} · {(item.power / 1_000_000).toFixed(1)}M</option>)}</select><button onClick={linkCommander} disabled={!selectedCommander || linking} className="mt-3 w-full rounded-xl bg-[#7c5cff] px-4 py-3 text-sm font-black disabled:opacity-40">{linking ? 'Linking…' : access.isAdmin ? 'Link my commander' : 'Request verification'}</button>{linkMessage && <p className="mt-3 text-sm text-[#e2c477]">{linkMessage}</p>}</div>}</article><article className="rounded-3xl bg-gradient-to-br from-[#7c5cff] to-[#4b62d8] p-6"><p className="text-xs font-black tracking-[.15em] opacity-70">NEXT STEP</p><p className="mt-7 text-2xl font-black leading-tight">Use account data to guide impact—not empty power.</p><button onClick={() => setTab('purchases')} className="mt-8 rounded-xl bg-white/15 px-4 py-3 text-sm font-black hover:bg-white/25">Check purchases →</button></article></div></>}

        {tab === 'alliance' && <><p className="text-sm font-black text-[#8d75ff]">ALLIANCE OVERVIEW</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">One team, one direction.</h1><div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Total power" value={compact(totalPower)} note="Current LWMA capture" /><Stat label="Roster" value={String(players.length)} note="Captured alliance members" /><Stat label="Average HQ" value={averageLevel.toFixed(1)} note="Across current roster" /><Stat label="Weekly donations" value={compact(players.reduce((sum,item)=>sum+(item.weeklyDonations ?? 0),0))} note="Alliance total" /></div><div className="mt-6 rounded-3xl border border-[#252c3d] bg-[#0f1420] p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Data coverage</h2><span className="text-xs font-bold text-[#66efb1]">LWMA rendered output</span></div><p className="mt-5 text-sm leading-7 text-[#8d97ae]">Power, headquarters level, alliance rank, kills and donations are stored inside the OOPZ database. AMP calculation datasets remain local to this project and are used for guidance.</p></div></>}

        {tab === 'compare' && <><p className="text-sm font-black text-[#8d75ff]">ALLIANCE COMPARISON</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">See your position—not just your rank.</h1><p className="mt-3 text-[#8690a7]">Current power, headquarters, kills and weekly donations from the latest LWMA roster capture.</p><div className="mt-8 max-h-[650px] overflow-auto rounded-3xl border border-[#252c3d] bg-[#0f1420]"><table className="w-full min-w-[650px] text-left"><thead className="sticky top-0 border-b border-[#252c3d] bg-[#0f1420] text-[11px] uppercase tracking-[.13em] text-[#68728b]"><tr><th className="p-5">Member</th><th>Power</th><th>HQ</th><th>Kills</th><th>Weekly donations</th></tr></thead><tbody>{players.map((item,index) => <tr key={item.lwmaPlayerId} className={`border-b border-[#1e2432] last:border-0 ${player?.lwmaPlayerId === item.lwmaPlayerId ? 'bg-[#7c5cff]/10' : ''}`}><td className="p-5 font-black"><span className="mr-3 text-[#647087]">#{index+1}</span>{item.playerName}</td><td>{compact(item.power)}</td><td>{item.level ?? '—'}</td><td>{compact(item.kills)}</td><td>{compact(item.weeklyDonations)}</td></tr>)}</tbody></table></div></>}

        {tab === 'reports' && <><p className="text-sm font-black text-[#8d75ff]">AI BATTLE LAB</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">Turn a report into a plan.</h1><div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><form onSubmit={analyzeReport} className="rounded-3xl border border-dashed border-[#3b455b] bg-[#0f1420] p-6"><label className="block text-sm font-black" htmlFor="report">Battle-report screenshots</label><p className="mt-2 text-sm leading-6 text-[#7f899f]">Choose 1–5 PNG, JPG or WebP screenshots, up to 8 MB each and 30 MB combined. All screenshots are analyzed together. Each member receives one analysis per calendar week, resetting Monday.</p><input id="report" type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={(e) => setReportFiles(Array.from(e.target.files ?? []).slice(0, 5))} className="mt-5 block w-full text-sm text-[#8e98ae] file:mr-4 file:rounded-lg file:border-0 file:bg-[#252d3d] file:px-4 file:py-3 file:font-bold file:text-white" /><p className="mt-3 text-xs text-[#7f899f]">{reportFiles.length ? `${reportFiles.length} screenshot${reportFiles.length === 1 ? '' : 's'} selected` : 'No screenshots selected'}</p><button disabled={!reportFiles.length || analyzing} className="mt-5 w-full rounded-xl bg-[#7c5cff] px-5 py-3 text-sm font-black disabled:cursor-not-allowed disabled:opacity-40">{analyzing ? 'Analyzing…' : 'Analyze report'}</button></form><article className="min-h-72 rounded-3xl border border-[#252c3d] bg-[#0f1420] p-6"><p className="text-xs font-black tracking-[.15em] text-[#68728b]">COMMANDER BRIEFING</p>{analysis ? <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-[#c5cad8]">{analysis}</p> : <div className="mt-12 text-center"><p className="text-xl font-black">Your analysis will appear here.</p><p className="mt-3 text-sm text-[#7f899f]">Expect matchup notes, damage gaps and prioritized upgrade advice.</p></div>}</article></div></>}

        {tab === 'purchases' && <><p className="text-sm font-black text-[#8d75ff]">PURCHASE ENGINE</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">Buy progress, not noise.</h1><div className="mt-6 flex flex-wrap gap-2">{(['Balanced','Drone','T10','Hero','VS','PvP'] as Focus[]).map((item) => <button key={item} onClick={() => setFocus(item)} className={`rounded-xl px-4 py-2.5 text-sm font-black ${focus===item?'bg-[#7c5cff]':'border border-[#30384a] text-[#8c96ac] hover:bg-[#141a27]'}`}>{item}</button>)}</div><div className="mt-6 grid gap-4 md:grid-cols-2">{recommendations.map((item) => <article key={`${item.store}-${item.item}`} className="rounded-2xl border border-[#252c3d] bg-[#0f1420] p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#68728b]">{item.store}</p><h2 className="mt-2 text-lg font-black">{item.item}</h2></div><span className={`rounded-lg px-3 py-2 text-xs font-black ${item.decision==='Buy'?'bg-[#173025] text-[#66efb1]':item.decision==='Consider'?'bg-[#302819] text-[#e8c76e]':'bg-[#2c1d23] text-[#ee8ca8]'}`}>{item.decision}</span></div><p className="mt-3 text-sm text-[#818ba2]">{item.qty.toLocaleString()} for {item.cost.toLocaleString()} {item.currency}</p><p className="mt-3 text-xs leading-5 text-[#aab1c3]">{item.why}</p></article>)}</div></>}

        {tab === 'guides' && <><p className="text-sm font-black text-[#8d75ff]">OOPZ FIELD MANUAL</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">Tips that match how we play.</h1><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[['VS','Score more without spending more','A day-by-day resource checklist.'],['WAR','The 30-second rally rule','Join faster and protect rally quality.'],['GROWTH','Where your next power belongs','Prioritize upgrades with real impact.'],['EVENT','Desert Storm roles','Opening moves, rotations and recovery.'],['DEFENSE','Protect troops during buster','Shield, reinforce and recover correctly.'],['ECONOMY','Spend diamonds with intent','High-value choices and common traps.']].map(([tag,title,copy]) => <article key={title} className="rounded-3xl border border-[#252c3d] bg-[#0f1420] p-6"><span className="rounded-md bg-[#211b42] px-2.5 py-1 text-[10px] font-black tracking-[.14em] text-[#a895ff]">{tag}</span><h2 className="mt-6 text-xl font-black">{title}</h2><p className="mt-3 text-sm leading-6 text-[#818ba2]">{copy}</p><p className="mt-7 text-xs font-black text-[#8d75ff]">READ GUIDE →</p></article>)}</div></>}

        {tab === 'admin' && access.isAdmin && <><p className="text-sm font-black text-[#8d75ff]">IDENTITY ADMIN</p><h1 className="mt-2 text-4xl font-black tracking-[-.04em]">Approve commander links.</h1><div className="mt-8 space-y-3">{claims.length ? claims.map((claim) => <article key={claim.discordId} className="flex flex-col gap-4 rounded-2xl border border-[#252c3d] bg-[#0f1420] p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-black">{claim.discordName} → {claim.playerName}</p><p className="mt-1 text-xs text-[#778198]">Discord {claim.discordId}</p></div><div className="flex gap-2"><button onClick={() => decide(claim.discordId,'approve')} className="rounded-lg bg-[#1d6b48] px-4 py-2 text-sm font-black">Approve</button><button onClick={() => decide(claim.discordId,'reject')} className="rounded-lg bg-[#5c2736] px-4 py-2 text-sm font-black">Reject</button></div></article>) : <p className="rounded-2xl border border-[#252c3d] bg-[#0f1420] p-6 text-[#8b95aa]">No pending commander claims.</p>}</div></>}
      </div>
    </section>
  </main>;
}
