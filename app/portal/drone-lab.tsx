"use client";
import { useMemo, useState } from "react";

const COMPONENTS = [
  { name: "Radar", chance: 0.222 },
  { name: "Turbo Engine", chance: 0.222 },
  { name: "External Armor", chance: 0.223 },
  { name: "Thermal Imager", chance: 0.111 },
  { name: "Fuel Cell", chance: 0.111 },
  { name: "Airborne Missile", chance: 0.111 },
] as const;
const MILESTONES = [30, 50, 70, 90, 110];
const PRE150 = [
  [5, 11250, 5],
  [10, 15000, 10],
  [15, 18750, 20],
  [20, 22500, 30],
  [25, 26250, 40],
  [30, 30000, 50],
  [31, 75000, 0],
  [35, 37500, 60],
  [40, 37500, 80],
  [45, 37500, 100],
  [50, 37500, 120],
  [51, 135000, 0],
  [55, 45000, 140],
  [60, 45000, 160],
  [65, 45000, 180],
  [70, 45000, 200],
  [71, 200000, 0],
  [75, 52500, 250],
  [80, 52500, 300],
  [85, 52500, 350],
  [90, 55000, 400],
  [91, 300000, 0],
  [95, 60000, 450],
  [100, 60000, 500],
  [105, 75000, 600],
  [110, 75000, 700],
  [111, 1080000, 0],
  [115, 180000, 800],
  [120, 180000, 1000],
  [125, 210000, 1500],
  [130, 210000, 2000],
  [135, 240000, 3000],
  [140, 240000, 4000],
  [145, 300000, 5000],
  [150, 900000, 500],
] as const;
type Profile = {
  level: number;
  components: number[];
  componentInventory: number[][];
  chestInventory: number[];
  chestLevel: number;
  chips: number[];
  data: number;
  parts: number;
};
const num = (v: unknown, f: number) =>
  typeof v === "number" && Number.isFinite(v) ? v : f;
const list = (v: unknown, n: number, f = 1) => {
  const a = Array.isArray(v) ? v : [];
  return Array.from({ length: n }, (_, i) => num(a[i], f));
};
const matrix = (v: unknown) => {
  const rows = Array.isArray(v) ? v : [];
  return Array.from({ length: 6 }, (_, i) => list(rows[i], 6, 0));
};
const compact = (n: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
const erf = (x: number) => {
  const sign = x < 0 ? -1 : 1;
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-a * a);
  return sign * y;
};
const normalCdf = (x: number) => (1 + erf(x / Math.sqrt(2))) / 2;
const nextWednesday = () => {
  const date = new Date();
  let days = (3 - date.getDay() + 7) % 7;
  if (days === 0) days = 7;
  date.setDate(date.getDate() + days);
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(date);
};
function upgradeRows() {
  const rows = PRE150.map(([target, data, parts]) => ({ target, data, parts }));
  for (let target = 151; target <= 250; target++) {
    const band = Math.floor((target - 150) / 10);
    const parts = target === 250 ? 2000 : 500 + Math.max(0, band) * 100;
    const data =
      target === 250
        ? 3_800_000
        : [
            900000, 1000000, 1125000, 1440000, 1620000, 1800000, 1980000,
            2160000, 2340000, 2520000,
          ][Math.min(9, Math.max(0, band))];
    rows.push({ target, data, parts });
  }
  return rows;
}
const DRONE_UPGRADES = upgradeRows();

export function DroneLab({
  initial,
  focus,
}: {
  initial: Record<string, unknown>;
  focus: "Tank" | "Air" | "Missile";
}) {
  const [p, setP] = useState<Profile>(() => ({
    level: num(initial.level, 1),
    components: list(initial.components, 6),
    componentInventory: matrix(initial.componentInventory),
    chestInventory: list(initial.chestInventory, 6, 0),
    chestLevel: num(initial.chestLevel, 1),
    chips: list(initial.chips, 4),
    data: num(initial.data, 0),
    parts: num(initial.parts, 0),
  }));
  const [message, setMessage] = useState("");
  const projection = useMemo(() => {
    let data = p.data,
      parts = p.parts,
      target = p.level,
      spentData = 0,
      spentParts = 0;
    for (const row of DRONE_UPGRADES.filter((row) => row.target > p.level)) {
      if (data < row.data || parts < row.parts) break;
      data -= row.data;
      parts -= row.parts;
      spentData += row.data;
      spentParts += row.parts;
      target = row.target;
    }
    return {
      target,
      levels: target - p.level,
      spentData,
      spentParts,
      data,
      parts,
    };
  }, [p.level, p.data, p.parts]);
  const componentPlans = useMemo(
    () =>
      COMPONENTS.map((component, i) => {
        const equipped = p.components[i];
        const target = equipped + 1;
        const targetValue = 3 ** equipped;
        const equippedValue = 3 ** Math.max(0, equipped - 1);
        const inventoryValue = p.componentInventory[i].reduce(
          (sum, count, index) => sum + count * 3 ** index,
          0,
        );
        const deficit = Math.max(
          0,
          targetValue - equippedValue - inventoryValue,
        );
        const expectedChestValue = p.chestInventory.reduce(
          (sum, count, index) => sum + count * component.chance * 3 ** index,
          0,
        );
        const chestVariance = p.chestInventory.reduce((sum, count, index) => {
          const value = 3 ** index;
          return (
            sum +
            count * component.chance * (1 - component.chance) * value * value
          );
        }, 0);
        const upgradeChance =
          deficit <= 0
            ? 1
            : chestVariance === 0
              ? 0
              : Math.max(
                  0,
                  Math.min(
                    1,
                    1 -
                      normalCdf(
                        (deficit - 0.5 - expectedChestValue) /
                          Math.sqrt(chestVariance),
                      ),
                  ),
                );
        const remainingDeficit = Math.max(0, deficit - expectedChestValue);
        const chestValue = 3 ** (p.chestLevel - 1);
        const boxes = remainingDeficit
          ? Math.ceil(remainingDeficit / chestValue / component.chance)
          : 0;
        return {
          ...component,
          equipped,
          target,
          deficit: remainingDeficit,
          boxes,
          ready: remainingDeficit === 0,
          upgradeChance,
        };
      }),
    [p.components, p.componentInventory, p.chestInventory, p.chestLevel],
  );
  const weak = componentPlans.reduce((a, b) => (a.boxes >= b.boxes ? a : b));
  const next = MILESTONES.find((v) => v > p.level);
  async function save() {
    const r = await fetch("/api/labs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "drone", profile: p }),
    });
    setMessage(
      r.ok
        ? "Drone level, materials and component inventory saved."
        : "Could not save drone profile.",
    );
  }
  function setComponent(i: number, value: number) {
    setP((x) => ({
      ...x,
      components: x.components.map((v, j) => (j === i ? value : v)),
    }));
  }
  function setInventory(component: number, level: number, value: number) {
    setP((x) => ({
      ...x,
      componentInventory: x.componentInventory.map((row, i) =>
        i === component
          ? row.map((v, j) => (j === level ? Math.max(0, value) : v))
          : row,
      ),
    }));
  }
  function setChestInventory(level: number, value: number) {
    setP((x) => ({
      ...x,
      chestInventory: x.chestInventory.map((old, i) =>
        i === level ? Math.max(0, value) : old,
      ),
    }));
  }
  return (
    <>
      <p className="text-sm font-black text-[#59d7ff]">DRONE DEVELOPMENT LAB</p>
      <h1 className="mt-2 text-4xl font-black tracking-[-.04em]">
        Know exactly what your stock can build.
      </h1>
      <p className="mt-3 max-w-3xl text-[#8690a7]">
        Enter your drone resources, equipped components and inventory. OOPZ
        calculates reachable levels and expected component chests.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Drone level"
          value={String(p.level)}
          note={
            next
              ? `Next skill milestone ${next}`
              : "Published milestones complete"
          }
        />
        <Stat
          label="Reachable now"
          value={String(projection.target)}
          note={`+${projection.levels} levels with current stock`}
        />
        <Stat
          label="Battle Data used"
          value={compact(projection.spentData)}
          note={`${compact(projection.data)} remains`}
        />
        <Stat
          label="Drone Parts used"
          value={compact(projection.spentParts)}
          note={`${compact(projection.parts)} remains`}
        />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <section className="rounded-3xl border border-[#252c3d] bg-[#0f1420] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black">Drone level calculator</h2>
              <p className="mt-1 text-xs text-[#7f899f]">
                Combat Boost is calculated by the game and is no longer
                requested here.
              </p>
            </div>
            <button
              onClick={save}
              className="w-full rounded-xl bg-[#168eb4] px-8 py-4 font-black sm:w-auto"
            >
              SAVE DRONE
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-[#66efb1]">{message}</p>}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Field
              label="Current drone level"
              value={p.level}
              min={1}
              max={250}
              onChange={(level) => setP((x) => ({ ...x, level }))}
            />
            <Field
              label="Battle Data owned"
              value={p.data}
              min={0}
              max={9999999999}
              onChange={(data) => setP((x) => ({ ...x, data }))}
            />
            <Field
              label="Drone Parts owned"
              value={p.parts}
              min={0}
              max={999999999}
              onChange={(parts) => setP((x) => ({ ...x, parts }))}
            />
          </div>
          <div className="mt-7">
            <div>
              <p className="text-xs font-black text-[#59d7ff]">
                COMPONENT INVENTORY
              </p>
              <p className="mt-1 text-xs text-[#68728b]">
                Fill in the components you already own. Three matching
                components merge into one component of the next level.
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {componentPlans.map((plan, i) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-[#283748] bg-[#121a25] p-4"
              >
                <div className="grid gap-4 lg:grid-cols-[150px_90px_minmax(360px,1fr)_150px] lg:items-end">
                  <div>
                    <p className="font-black">{plan.name}</p>
                    <p className="mt-1 text-[11px] text-[#6f7f93]">
                      Chest chance {(plan.chance * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Field
                    label="Equipped level"
                    value={plan.equipped}
                    min={1}
                    max={12}
                    onChange={(value) => setComponent(i, value)}
                  />
                  <div>
                    <p className="text-[10px] font-black text-[#718096]">
                      INVENTORY BY LEVEL
                    </p>
                    <div className="mt-2 grid grid-cols-6 gap-3">
                      {p.componentInventory[i].map((count, level) => (
                        <label key={level} className="text-center">
                          <span className="text-[9px] text-[#657186]">
                            L{level + 1}
                          </span>
                          <input
                            aria-label={`${plan.name} level ${level + 1} inventory`}
                            type="number"
                            min="0"
                            value={count}
                            onChange={(e) =>
                              setInventory(
                                i,
                                level,
                                Number(e.target.value) || 0,
                              )
                            }
                            className="mt-1 w-full min-w-12 rounded-xl border border-[#344153] bg-[#0c121b] px-2 py-3 text-center text-base font-black text-white outline-none focus:border-[#59d7ff]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-3 text-center ${plan.ready ? "bg-[#173126] text-[#69efb4]" : "bg-[#202b3a]"}`}
                  >
                    <p className="text-[10px] font-black">
                      TO LEVEL {plan.target}
                    </p>
                    <p className="mt-1 text-2xl font-black">
                      {plan.ready ? "READY" : plan.boxes}
                    </p>
                    <p className="text-[10px]">
                      {plan.ready
                        ? "Inventory is enough"
                        : `expected Lv${p.chestLevel} chests`}
                    </p>
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="text-[9px] font-black text-[#8f9bb0]">
                        BY NEXT WEDNESDAY
                      </p>
                      <p className="mt-1 text-lg font-black text-[#ff75d5]">
                        {(plan.upgradeChance * 100).toFixed(
                          plan.upgradeChance > 0 && plan.upgradeChance < 0.01
                            ? 1
                            : 0,
                        )}
                        %
                      </p>
                      <p className="text-[9px] text-[#8490a5]">
                        upgrade probability
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-2xl border border-[#344153] bg-[#121a25] p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[#ff63cd]">
                  UNOPENED COMPONENT CHESTS
                </p>
                <p className="mt-1 text-xs text-[#7f899f]">
                  Enter how many level 1–6 component boxes you have in your
                  inventory.
                </p>
              </div>
              <div className="min-w-64">
                <p className="text-[10px] font-black text-[#7f899f]">
                  SHOW EXTRA BOXES NEEDED AS
                </p>
                <div className="mt-2 grid grid-cols-6 gap-1">
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setP((x) => ({ ...x, chestLevel: level }))}
                      className={`rounded-lg py-2 text-xs font-black ${p.chestLevel === level ? "bg-[#168eb4]" : "bg-[#1b2432] text-[#8590a6]"}`}
                    >
                      L{level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {p.chestInventory.map((count, level) => (
                <Field
                  key={level}
                  label={`Level ${level + 1} boxes`}
                  value={count}
                  min={0}
                  max={999999}
                  onChange={(value) => setChestInventory(level, value)}
                />
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-[#85dcae]">
              Your unopened boxes are included in every estimate using the saved
              drop chances. Because their contents are random, this contribution
              is an expected average rather than a guarantee.
            </p>
            <p className="mt-2 text-xs text-[#718096]">
              Wednesday forecast: {nextWednesday()}. It assumes you open the
              boxes currently entered above before then.
            </p>
          </div>
          <div className="mt-7">
            <p className="text-xs font-black text-[#59d7ff]">
              ACTIVE {focus.toUpperCase()} SKILL-CHIP SET
            </p>
            <p className="mt-1 text-xs text-[#8e98ae]">
              Keep the four chips for your T1 march balanced.
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {p.chips.map((v, i) => (
                <Field
                  key={i}
                  label={`${focus} Chip ${i + 1}`}
                  value={v}
                  max={20}
                  onChange={(n) =>
                    setP((x) => ({
                      ...x,
                      chips: x.chips.map((old, j) => (j === i ? n : old)),
                    }))
                  }
                />
              ))}
            </div>
          </div>
        </section>
        <aside className="self-start rounded-3xl border border-[#252c3d] bg-[#0f1420] p-5">
          <p className="text-xs font-black tracking-[.14em] text-[#68728b]">
            YOUR DRONE PLAN
          </p>
          <ol className="mt-4 space-y-3 text-sm">
            <Priority
              title={`1. Raise drone to ${projection.target}`}
              text={
                projection.levels
                  ? `Your current Battle Data and Parts cover ${projection.levels} levels. This uses ${compact(projection.spentData)} data and ${compact(projection.spentParts)} parts.`
                  : "You cannot complete the next drone upgrade with both resources yet."
              }
            />
            <Priority
              title={`2. Build ${weak.name} → ${weak.target}`}
              text={
                weak.ready
                  ? "Your saved inventory already contains enough merge value."
                  : `On average, about ${weak.boxes} level ${p.chestLevel} chests are needed at its ${(weak.chance * 100).toFixed(1)}% drop rate.`
              }
            />
            <Priority
              title={`3. Keep ${focus} chips balanced`}
              text="Upgrade the weakest chip in your active T1 set before spreading resources to secondary troop types."
            />
          </ol>
          <div className="mt-4 rounded-xl border border-[#314436] bg-[#122019] p-3 text-xs leading-5 text-[#85dcae]">
            Chest totals are statistical estimates, not guarantees. Actual drops
            vary. Inventory is converted with the verified 3-to-1 merge rule.
          </div>
        </aside>
      </div>
    </>
  );
}
function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-[#252c3d] bg-[#111722] p-5">
      <p className="text-xs text-[#68728b]">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      <p className="mt-2 text-xs text-[#66efb1]">{note}</p>
    </div>
  );
}
function Priority({ title, text }: { title: string; text: string }) {
  return (
    <li className="rounded-xl bg-[#171d2b] p-3">
      <strong>{title}</strong>
      <p className="mt-1 text-xs leading-5 text-[#8e98ae]">{text}</p>
    </li>
  );
}
function Field({
  label,
  value,
  onChange,
  min = 1,
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
      <span className="text-[10px] font-bold uppercase tracking-[.08em] text-[#6f7990]">
        {label}
      </span>
      <input
        aria-label={label}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))
        }
        className="mt-2 w-full rounded-xl border border-[#30384a] bg-[#151b28] px-3 py-3 text-center font-black text-white outline-none focus:border-[#168eb4]"
      />
    </label>
  );
}
