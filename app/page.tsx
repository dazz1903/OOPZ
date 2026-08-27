const focus = [
  { title: 'Build smarter', copy: 'Personal priorities based on your heroes, gear and account goals.' },
  { title: 'Fight better', copy: 'Battle-report feedback that turns losses into clear next actions.' },
  { title: 'Grow together', copy: 'Alliance progress, friendly comparison and one shared roadmap.' },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080b12] text-white">
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#7c5cff] text-sm font-black shadow-[0_0_30px_rgba(124,92,255,.28)]">OP</span><div><p className="font-black tracking-[.18em]">OOPZ</p><p className="text-[10px] uppercase tracking-[.2em] text-[#77809a]">Alliance command</p></div></div>
        <a href="/auth/discord" className="rounded-xl bg-white px-5 py-3 text-sm font-black text-[#111420] transition hover:-translate-y-0.5">Continue with Discord</a>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-14 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:pt-24">
        <div className="pointer-events-none absolute left-[18%] top-0 h-80 w-80 rounded-full bg-[#7c5cff]/15 blur-[100px]" />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#2a3040] bg-[#111622] px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-[#a9b1ca]"><span className="h-2 w-2 rounded-full bg-[#66efb1] shadow-[0_0_12px_#66efb1]" /> Built for our Discord</p>
          <h1 className="mt-7 text-5xl font-black leading-[.92] tracking-[-.06em] sm:text-7xl">Know your account.<br /><span className="bg-gradient-to-r from-[#9a83ff] to-[#66d9ef] bg-clip-text text-transparent">Know your next move.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#98a1bb]">A private home for OOPZ members—personal progress, alliance intelligence, comparisons, battle analysis and smarter purchases.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="/auth/discord" className="rounded-xl bg-[#7c5cff] px-6 py-4 text-sm font-black shadow-[0_16px_45px_rgba(124,92,255,.22)] transition hover:-translate-y-0.5">Sign in with Discord →</a><a href="#inside" className="rounded-xl border border-[#303748] px-6 py-4 text-sm font-bold text-[#c8cde0] hover:bg-[#111622]">Explore the hub</a></div>
          <p className="mt-4 text-xs text-[#626b82]">Access is limited to verified members of the OOPZ Discord server.</p>
        </div>

        <div className="relative rounded-[30px] border border-[#2b3243] bg-[#0f1420]/95 p-4 shadow-2xl shadow-black/40 sm:p-6">
          <div className="flex items-center justify-between border-b border-[#252b3a] pb-5"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#69738d]">Command overview</p><h2 className="mt-1 text-xl font-black">Good evening, Commander</h2></div><span className="rounded-lg bg-[#172b25] px-3 py-2 text-xs font-bold text-[#66efb1]">● SYNCED</span></div>
          <div className="mt-5 grid grid-cols-3 gap-3">{[['POWER','184.2M','+6.8M'],['OOPZ RANK','#14','↑ 3'],['VS SCORE','28.6M','Top 22%']].map(([label,value,note]) => <div key={label} className="rounded-2xl border border-[#252c3d] bg-[#141a27] p-4"><p className="text-[10px] font-bold text-[#68728b]">{label}</p><p className="mt-2 text-xl font-black sm:text-2xl">{value}</p><p className="mt-1 text-[11px] text-[#66efb1]">{note}</p></div>)}</div>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#171d2b] to-[#121722] p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-[#7c86a0]">NEXT BEST MOVE</p><p className="mt-2 text-lg font-black">Upgrade primary weapon to 40</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7c5cff] font-black">1</span></div><p className="mt-3 text-sm leading-6 text-[#8d96ad]">Your highest-impact gain before the next VS cycle. Hold drone parts until the component set is complete.</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-[#262d3e]"><div className="h-full w-[76%] rounded-full bg-gradient-to-r from-[#7c5cff] to-[#66d9ef]" /></div></div>
        </div>
      </section>

      <section id="inside" className="border-y border-[#222837] bg-[#0b0f18]"><div className="mx-auto grid max-w-7xl gap-px bg-[#222837] sm:grid-cols-3">{focus.map((item, i) => <article key={item.title} className="bg-[#0b0f18] p-8"><span className="text-xs font-black text-[#7c5cff]">0{i + 1}</span><h2 className="mt-5 text-xl font-black">{item.title}</h2><p className="mt-3 leading-7 text-[#858fa8]">{item.copy}</p></article>)}</div></section>
    </main>
  );
}
