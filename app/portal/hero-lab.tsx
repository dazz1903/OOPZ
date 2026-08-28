"use client";
import { useMemo, useState } from "react";
import {
  HEROES,
  xpToReachLevel,
  shardsToStar,
} from "@/lib/game-data/hero-data";
import {
  SQUAD_GUIDES,
  verifiedHeroRole,
  type TroopFocus,
} from "@/lib/game-data/squad-guides";
type Slot = {
  name: string;
  level: number;
  star: number;
  steps: number;
  skillLevels: Record<string, number>;
};
type Profile = { vehicle: "tank" | "aircraft" | "missile"; heroes: Slot[] };
const blank = (): Slot => ({
  name: "",
  level: 1,
  star: 0,
  steps: 0,
  skillLevels: {},
});
const compact = (n: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
export function HeroLab({
  initial,
  hqLevel,
  focus,
}: {
  initial: Record<string, unknown>;
  hqLevel: number;
  focus: TroopFocus;
}) {
  const seeded = initial as Partial<Profile>,
    guide = SQUAD_GUIDES[focus],
    vehicle =
      focus === "Air"
        ? "aircraft"
        : (focus.toLowerCase() as "tank" | "missile"),
    pool = HEROES.filter((hero) => hero.vehicle === vehicle),
    cap = Math.min(175, hqLevel * 5);
  const [profile, setProfile] = useState<Profile>({
    vehicle,
    heroes: Array.from({ length: 5 }, (_, i) => {
      const saved = seeded.heroes?.[i];
      return saved &&
        HEROES.find((hero) => hero.name === saved.name)?.vehicle === vehicle
        ? { ...saved, skillLevels: saved.skillLevels ?? {} }
        : blank();
    }),
  });
  const [message, setMessage] = useState("");
  const skillsFor = (name: string) => {
    const guided =
      guide.heroes.find((hero) => hero.name === name)?.skills ?? [];
    const hero = HEROES.find((item) => item.name === name);
    const remaining = (hero?.skills ?? [])
      .filter((skill) => !guided.some((item) => item.name === skill.name))
      .map((skill) => ({ name: skill.name, priority: 3 as const }));
    return guided.length
      ? [...guided, ...remaining]
      : (hero?.skills.map((skill, index) => ({
          name: skill.name,
          priority: Math.min(3, index + 1) as 1 | 2 | 3,
        })) ?? []);
  };
  const nextSkills = useMemo(
    () =>
      profile.heroes
        .flatMap((slot, heroIndex) =>
          skillsFor(slot.name).map((skill) => ({
            hero: slot.name,
            heroIndex,
            skill,
            level: slot.skillLevels[skill.name] ?? 0,
          })),
        )
        .filter((item) => item.hero && item.level < 30)
        .sort(
          (a, b) =>
            a.skill.priority - b.skill.priority ||
            a.level - b.level ||
            a.heroIndex - b.heroIndex,
        ),
    [profile],
  );
  function update(i: number, patch: Partial<Slot>) {
    setProfile((p) => ({
      ...p,
      heroes: p.heroes.map((slot, index) =>
        index === i ? { ...slot, ...patch } : slot,
      ),
    }));
  }
  function setSkill(i: number, name: string, value: number) {
    update(i, {
      skillLevels: {
        ...profile.heroes[i].skillLevels,
        [name]: Math.max(0, Math.min(30, value)),
      },
    });
  }
  async function save() {
    const r = await fetch("/api/labs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "hero", profile }),
    });
    setMessage(
      r.ok
        ? "Heroes and every skill saved. Gear Lab is now synced. Reloading…"
        : "Could not save hero profile.",
    );
    if (r.ok) setTimeout(() => window.location.reload(), 800);
  }
  return (
    <>
      <p className="text-sm font-black text-[#ff67cf]">
        HERO DEVELOPMENT LAB · {focus.toUpperCase()} T1
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-[-.04em]">
        Every hero. Every skill. In the right order.
      </h1>
      <div className="mt-5 rounded-2xl border border-[#573062] bg-[#130c19] p-5">
        <p className="text-xs font-black text-[#ff77d5]">
          GUIDE SQUAD: {guide.levelAdvice}
        </p>
        <p className="mt-2 text-sm text-[#ad9ab5]">{guide.starAdvice}</p>
        <p className="mt-2 text-xs text-[#82718a]">
          Raise every skill to level 30; priority controls order, not whether a
          skill gets developed.
        </p>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.3fr_.7fr]">
        <section className="rounded-3xl border border-[#392641] bg-[#100b15] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black">My primary squad</h2>
              <p className="mt-1 text-sm text-[#96869e]">
                Hero cap from HQ {hqLevel}: {cap}
              </p>
            </div>
            <button
              onClick={save}
              className="w-full rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] px-7 py-4 font-black sm:w-auto"
            >
              SAVE HEROES & SKILLS
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-[#ff8fda]">{message}</p>}
          <div className="mt-5 space-y-4">
            {profile.heroes.map((slot, i) => {
              const skills = skillsFor(slot.name);
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-[#302039] bg-[#17101e] p-4"
                >
                  <div className="grid gap-3 sm:grid-cols-[1.5fr_.55fr_.55fr_.55fr]">
                    <label>
                      <span className="text-[10px] text-[#8e7d96]">
                        POSITION {i + 1}
                      </span>
                      <select
                        value={slot.name}
                        onChange={(e) =>
                          update(i, { name: e.target.value, skillLevels: {} })
                        }
                        className="mt-1 w-full rounded-lg bg-[#25182e] px-3 py-2"
                      >
                        <option value="">Choose {focus} hero…</option>
                        {pool.map((hero) => (
                          <option key={hero.name} value={hero.name}>
                            {hero.name} · {hero.rarity} ·{" "}
                            {verifiedHeroRole(hero.name, hero.role)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Number
                      label="LEVEL"
                      value={slot.level}
                      max={cap}
                      min={1}
                      onChange={(level) => update(i, { level })}
                    />
                    <Number
                      label="STARS"
                      value={slot.star}
                      max={5}
                      onChange={(star) => update(i, { star, steps: 0 })}
                    />
                    <Number
                      label="STEPS"
                      value={slot.steps}
                      max={4}
                      onChange={(steps) => update(i, { steps })}
                    />
                  </div>
                  {skills.length > 0 && (
                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      {skills.map((skill) => (
                        <label
                          key={skill.name}
                          className="flex items-center gap-3 rounded-xl bg-[#21152a] p-3"
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-black ${skill.priority === 1 ? "bg-[#ec4899]" : skill.priority === 2 ? "bg-[#8b5cf6]" : "bg-[#43314d] text-[#c9b4d0]"}`}
                          >
                            P{skill.priority}
                          </span>
                          <span className="min-w-0 flex-1 text-sm font-bold">
                            {skill.name}
                          </span>
                          <input
                            aria-label={`${slot.name} ${skill.name} level`}
                            type="number"
                            min="0"
                            max="30"
                            value={slot.skillLevels[skill.name] ?? 0}
                            onChange={(e) =>
                              setSkill(i, skill.name, Number(e.target.value))
                            }
                            className="w-16 rounded-lg bg-[#130d18] px-2 py-2 text-center font-black"
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        <aside className="self-start rounded-3xl border border-[#392641] bg-[#100b15] p-5">
          <p className="text-xs font-black tracking-[.14em] text-[#a98ab1]">
            NEXT SKILL MOVES
          </p>
          <div className="mt-4 space-y-3">
            {nextSkills.slice(0, 12).map((item, index) => (
              <div
                key={`${item.hero}-${item.skill.name}`}
                className="rounded-xl bg-[#1b1222] p-3"
              >
                <p className="font-black">
                  <span className="text-[#ff68d1]">{index + 1}.</span>{" "}
                  {item.hero}
                </p>
                <p className="mt-1 text-sm">
                  {item.skill.name} → {Math.min(30, item.level + 1)}
                </p>
                <p className="mt-1 text-[10px] font-black text-[#a179ae]">
                  PRIORITY {item.skill.priority} · CURRENT {item.level}/30
                </p>
              </div>
            ))}
            {!nextSkills.length && (
              <p className="text-sm text-[#9d8ba5]">
                Choose heroes to build the full skill plan.
              </p>
            )}
          </div>
          <div className="mt-5 rounded-xl bg-[#21152a] p-4 text-xs leading-5 text-[#bba9c2]">
            <strong className="text-white">Level order:</strong>{" "}
            {guide.levelAdvice}
            <br />
            <strong className="text-white">Star plan:</strong>{" "}
            {guide.starAdvice}
          </div>
        </aside>
      </div>
      <section className="mt-6 rounded-3xl border border-[#392641] bg-[#100b15] p-6">
        <h2 className="text-xl font-black">Hero resource outlook</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {profile.heroes
            .filter((slot) => slot.name)
            .map((slot) => (
              <div key={slot.name} className="rounded-xl bg-[#1b1222] p-4">
                <p className="font-black">{slot.name}</p>
                <p className="mt-2 text-xs text-[#b49fbc]">
                  {compact(xpToReachLevel(slot.level, cap))} XP to {cap}
                </p>
                <p className="mt-1 text-xs text-[#b49fbc]">
                  {shardsToStar(
                    slot.star,
                    slot.steps,
                    Math.min(5, slot.star + 1),
                  )}{" "}
                  shards to next star
                </p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
function Number({
  label,
  value,
  onChange,
  min = 0,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
}) {
  return (
    <label>
      <span className="text-[10px] text-[#8e7d96]">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))
        }
        className="mt-1 w-full rounded-lg bg-[#25182e] px-3 py-2 text-center font-black"
      />
    </label>
  );
}
