export type HeroRarity = "UR" | "SSR" | "SR";
export type HeroRole = "dps" | "tank" | "support";
export type VehicleType = "tank" | "aircraft" | "missile";

export interface HeroSkillDef {
  slot: "skill1" | "skill2" | "skill3";
  name: string;
}

export interface HeroDef {
  name: string;
  rarity: HeroRarity;
  role: HeroRole;
  vehicle: VehicleType;
  tier: "S" | "A" | "B" | "C" | "D";
  skillPriority: ("skill1" | "skill2" | "skill3")[];
  skills: HeroSkillDef[];
  canPromote?: boolean;
}

export const SHARD_PER_STEP: Record<number, number> = {
  1: 5,
  2: 10,
  3: 20,
  4: 60,
  5: 100,
};

export const SHARD_COSTS: Record<number, number> = {
  1: 25,
  2: 50,
  3: 100,
  4: 300,
  5: 500,
};

export const SKILL_UNLOCK_STAR: Record<string, number> = {
  skill1: 0,
  skill2: 2,
  skill3: 3,
  skill4: 4,
};

export const SKILL_MEDAL_COSTS: Record<HeroRarity, number[]> = {
  UR: [
    200, 200, 400, 400, 600, 600, 800, 800, 1200, 1600, 2400, 3200, 4000, 4800,
    5600, 6400, 7200, 8000, 9200, 10400, 11600, 12800, 14000, 15200, 16400,
    18000, 20000, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000,
    40000, 42000, 44000,
  ],
  SSR: [
    180, 180, 360, 360, 540, 540, 720, 720, 1080, 1440, 2160, 2880, 3600, 4320,
    5040, 5760, 6480, 7200, 8280, 9360, 10440, 11520, 12600, 13680, 14760,
    16200, 18000, 19800, 21600,
  ],
  SR: [
    160, 160, 320, 320, 480, 480, 640, 640, 960, 1280, 1920, 2560, 3200, 3840,
    4480, 5120, 5760, 5760, 6400, 7360, 8320, 9280, 10240, 11200, 12160, 13120,
    14400, 16000, 17600, 19200,
  ],
};

// HQ 30 is the Season 1 cap — HQ 31-35 unlock after Season 2
export const HQ_TO_MAX_HERO_LEVEL: Record<number, number> = Object.fromEntries(
  Array.from({ length: 30 }, (_, i) => {
    const hq = i + 1;
    return [hq, Math.max(20, hq * 5)];
  }),
);

export const HERO_XP_COSTS: number[] = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
  1500, 1600, 1700, 1800, 1900, 2000, 2100, 2300, 2700, 3200, 3900, 4600, 5500,
  6600, 8000, 9500, 12000, 14000, 17000, 20000, 24000, 29000, 35000, 41000,
  49000, 59000, 71000, 85000, 110000, 130000, 150000, 180000, 220000, 260000,
  310000, 370000, 440000, 530000, 630000, 760000, 910000, 1100000, 1400000,
  1600000, 1900000, 2100000, 2300000, 2500000, 2800000, 3100000, 3400000,
  3700000, 4100000, 4500000, 4900000, 5400000, 5900000, 6500000, 7200000,
  7900000, 8700000, 9500000, 11000000, 12000000, 13000000, 13000000, 14000000,
  14000000, 15000000, 16000000, 17000000, 18000000, 19000000, 20000000,
  21000000, 22000000, 23000000, 24000000, 25000000, 26000000, 27000000,
  28000000, 30000000, 31000000, 33000000, 35000000, 37000000, 39000000,
  41000000, 43000000, 45000000, 47000000, 49000000, 51000000, 53000000,
  55000000, 57000000, 59000000, 61000000, 63000000, 65000000, 67000000,
  69000000, 71000000, 73000000, 75000000, 77000000, 79000000, 81000000,
  83000000, 85000000, 87000000, 89000000, 91000000, 93000000, 95000000,
  97000000, 100000000, 105000000, 110000000, 115000000, 120000000, 125000000,
  130000000, 135000000, 140000000, 145000000, 150000000, 155000000, 160000000,
  165000000, 170000000, 175000000, 180000000, 185000000, 200000000, 215000000,
  230000000, 245000000, 260000000, 275000000, 290000000, 305000000, 320000000,
  335000000, 350000000, 365000000, 380000000, 395000000, 410000000, 435000000,
  460000000, 485000000, 510000000, 535000000, 560000000, 585000000, 610000000,
  635000000, 660000000,
];

export const HEROES: HeroDef[] = [
  // TANK
  {
    name: "Kimberly",
    rarity: "UR",
    role: "dps",
    vehicle: "tank",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Barrage Strike" },
      { slot: "skill2", name: "Energy Boost" },
      { slot: "skill3", name: "Energy Assault" },
    ],
  },
  {
    name: "Williams",
    rarity: "UR",
    role: "tank",
    vehicle: "tank",
    tier: "S",
    skillPriority: ["skill2", "skill1", "skill3"],
    skills: [
      { slot: "skill1", name: "Iron Will" },
      { slot: "skill2", name: "Critical Charge" },
      { slot: "skill3", name: "Stand Firm" },
    ],
  },
  {
    name: "Murphy",
    rarity: "UR",
    role: "tank",
    vehicle: "tank",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "All-Around Armor" },
      { slot: "skill2", name: "Stand Firm" },
      { slot: "skill3", name: "Iron Barrier" },
    ],
  },
  {
    name: "Marshall",
    rarity: "UR",
    role: "support",
    vehicle: "tank",
    tier: "S",
    skillPriority: ["skill1", "skill3", "skill2"],
    skills: [
      { slot: "skill1", name: "Command Strategy" },
      { slot: "skill2", name: "Rally Cry" },
      { slot: "skill3", name: "Triad Harmony" },
    ],
  },
  {
    name: "Stetmann",
    rarity: "UR",
    role: "dps",
    vehicle: "tank",
    tier: "A",
    skillPriority: ["skill1", "skill3", "skill2"],
    skills: [
      { slot: "skill1", name: "Lightning Rush" },
      { slot: "skill2", name: "Static Field" },
      { slot: "skill3", name: "Orb Lightning" },
    ],
  },
  {
    name: "Scarlett",
    rarity: "SSR",
    role: "dps",
    vehicle: "tank",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Flame Strike" },
      { slot: "skill2", name: "Blazing Rush" },
      { slot: "skill3", name: "Inferno Surge" },
    ],
    canPromote: true,
  },
  {
    name: "Mason",
    rarity: "SSR",
    role: "dps",
    vehicle: "tank",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Power Strike" },
      { slot: "skill2", name: "Battle Surge" },
      { slot: "skill3", name: "Iron Fist" },
    ],
    canPromote: true,
  },
  {
    name: "Violet",
    rarity: "SSR",
    role: "support",
    vehicle: "tank",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Healing Wave" },
      { slot: "skill2", name: "Barrier Field" },
      { slot: "skill3", name: "Revive Pulse" },
    ],
    canPromote: true,
  },
  {
    name: "Monica",
    rarity: "UR",
    role: "support",
    vehicle: "tank",
    tier: "B",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Support Fire" },
      { slot: "skill2", name: "Shield Boost" },
      { slot: "skill3", name: "Emergency Aid" },
    ],
  },
  {
    name: "Richard",
    rarity: "SSR",
    role: "tank",
    vehicle: "tank",
    tier: "C",
    skillPriority: ["skill2", "skill1", "skill3"],
    skills: [
      { slot: "skill1", name: "Heavy Charge" },
      { slot: "skill2", name: "Iron Defense" },
      { slot: "skill3", name: "Bulwark" },
    ],
  },
  {
    name: "Farhad",
    rarity: "SR",
    role: "dps",
    vehicle: "tank",
    tier: "C",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Ground Slam" },
      { slot: "skill2", name: "Dust Storm" },
      { slot: "skill3", name: "Desert Fury" },
    ],
  },
  {
    name: "Gump",
    rarity: "SR",
    role: "tank",
    vehicle: "tank",
    tier: "D",
    skillPriority: ["skill2", "skill1", "skill3"],
    skills: [
      { slot: "skill1", name: "Taunt" },
      { slot: "skill2", name: "Fortify" },
      { slot: "skill3", name: "Last Stand" },
    ],
  },
  {
    name: "Loki",
    rarity: "UR",
    role: "dps",
    vehicle: "tank",
    tier: "D",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Shadow Strike" },
      { slot: "skill2", name: "Illusion" },
      { slot: "skill3", name: "Trick Shot" },
    ],
  },
  // AIRCRAFT
  {
    name: "DVA",
    rarity: "UR",
    role: "dps",
    vehicle: "aircraft",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Steel Barrage" },
      { slot: "skill2", name: "Vortex Missile" },
      { slot: "skill3", name: "Armament Upgrade" },
    ],
  },
  {
    name: "Morrison",
    rarity: "UR",
    role: "dps",
    vehicle: "aircraft",
    tier: "S",
    skillPriority: ["skill1", "skill3", "skill2"],
    skills: [
      { slot: "skill1", name: "Knight's Spirit" },
      { slot: "skill2", name: "Energy Adaption" },
      { slot: "skill3", name: "Lightning Triple Strike" },
    ],
  },
  {
    name: "Lucius",
    rarity: "UR",
    role: "tank",
    vehicle: "aircraft",
    tier: "A",
    skillPriority: ["skill2", "skill1", "skill3"],
    skills: [
      { slot: "skill1", name: "Silver Armor" },
      { slot: "skill2", name: "Full Firepower" },
      { slot: "skill3", name: "Dual-string Rocket" },
    ],
  },
  {
    name: "Carlie",
    rarity: "UR",
    role: "tank",
    vehicle: "aircraft",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Inferno Blaze" },
      { slot: "skill2", name: "Full-Auto Machine" },
      { slot: "skill3", name: "Afterburner" },
    ],
  },
  {
    name: "Schuyler",
    rarity: "UR",
    role: "dps",
    vehicle: "aircraft",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Armor-Piercing Shot" },
      { slot: "skill2", name: "Blast Frenzy" },
      { slot: "skill3", name: "Antimatter Armor" },
    ],
  },
  {
    name: "Sarah",
    rarity: "SSR",
    role: "support",
    vehicle: "aircraft",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Combat Support" },
      { slot: "skill2", name: "Air Shield" },
      { slot: "skill3", name: "Tactical Boost" },
    ],
    canPromote: true,
  },
  {
    name: "Cage",
    rarity: "SR",
    role: "tank",
    vehicle: "aircraft",
    tier: "B",
    skillPriority: ["skill2", "skill1", "skill3"],
    skills: [
      { slot: "skill1", name: "Air Slam" },
      { slot: "skill2", name: "Steel Wings" },
      { slot: "skill3", name: "Dive Bomb" },
    ],
  },
  {
    name: "Ambolt",
    rarity: "SSR",
    role: "support",
    vehicle: "aircraft",
    tier: "D",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Healing Pulse" },
      { slot: "skill2", name: "Recovery Field" },
      { slot: "skill3", name: "Mend" },
    ],
  },
  // MISSILE
  {
    name: "Swift",
    rarity: "UR",
    role: "dps",
    vehicle: "missile",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Targeted Strike" },
      { slot: "skill2", name: "Lightning Chase" },
      { slot: "skill3", name: "Precise Guidance" },
    ],
  },
  {
    name: "Tesla",
    rarity: "UR",
    role: "dps",
    vehicle: "missile",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Weakness Targeting" },
      { slot: "skill2", name: "Overload" },
      { slot: "skill3", name: "Electric Power Boost" },
    ],
  },
  {
    name: "Adam",
    rarity: "UR",
    role: "tank",
    vehicle: "missile",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Electric Grid Lockdown" },
      { slot: "skill2", name: "Combat Defense" },
      { slot: "skill3", name: "MM41 Vehicle-Mounted Machine Gun" },
    ],
  },
  {
    name: "Fiona",
    rarity: "UR",
    role: "dps",
    vehicle: "missile",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Spike Armor" },
      { slot: "skill2", name: "Atomic Blast" },
      { slot: "skill3", name: "Ballistic Boost" },
    ],
  },
  {
    name: "McGregor",
    rarity: "UR",
    role: "tank",
    vehicle: "missile",
    tier: "S",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Double Trajectory" },
      { slot: "skill2", name: "Unyielding Heart" },
      { slot: "skill3", name: "Forward Rush" },
    ],
  },
  {
    name: "Venom",
    rarity: "SSR",
    role: "dps",
    vehicle: "missile",
    tier: "A",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Venom Strike" },
      { slot: "skill2", name: "Toxic Barrage" },
      { slot: "skill3", name: "Poison Cloud" },
    ],
    canPromote: true,
  },
  {
    name: "Elsa",
    rarity: "SR",
    role: "support",
    vehicle: "missile",
    tier: "B",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Frost Bolt" },
      { slot: "skill2", name: "Blizzard" },
      { slot: "skill3", name: "Ice Barrier" },
    ],
  },
  {
    name: "Blaz",
    rarity: "SR",
    role: "dps",
    vehicle: "missile",
    tier: "C",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Fire Missile" },
      { slot: "skill2", name: "Flame Trail" },
      { slot: "skill3", name: "Blaze Surge" },
    ],
  },
  {
    name: "Kane",
    rarity: "SSR",
    role: "dps",
    vehicle: "missile",
    tier: "D",
    skillPriority: ["skill1", "skill2", "skill3"],
    skills: [
      { slot: "skill1", name: "Snipe" },
      { slot: "skill2", name: "Penetrating Shot" },
      { slot: "skill3", name: "Killshot" },
    ],
  },
];

export const HERO_MAP = new Map(HEROES.map((h) => [h.name.toLowerCase(), h]));

export function parseStarProgress(value: string): {
  star: number;
  steps: number;
} {
  const parts = value.split(".");
  const star = parseInt(parts[0]) || 0;
  const steps = parseInt(parts[1]) || 0;
  return { star, steps };
}

export function shardsToNextStar(
  currentStar: number,
  currentSteps: number,
): number {
  if (currentStar >= 5) return 0;
  const nextStar = currentStar + 1;
  const stepsRemaining = 5 - currentSteps;
  return stepsRemaining * SHARD_PER_STEP[nextStar];
}

export function shardsToStar(
  fromStar: number,
  fromSteps: number,
  toStar: number,
): number {
  let total = 0;
  let star = fromStar;
  let steps = fromSteps;
  if (steps > 0 && star < toStar) {
    total += (5 - steps) * SHARD_PER_STEP[star + 1];
    star += 1;
    steps = 0;
  }
  for (let s = star + 1; s <= toStar; s++) {
    total += 5 * SHARD_PER_STEP[s];
  }
  return total;
}

export function xpToReachLevel(fromLevel: number, toLevel: number): number {
  let total = 0;
  for (let l = fromLevel; l < toLevel; l++) {
    total += HERO_XP_COSTS[l - 1] ?? 0;
  }
  return total;
}

export function medalsForNextSkillLevel(
  rarity: HeroRarity,
  currentLevel: number,
): number {
  return SKILL_MEDAL_COSTS[rarity][currentLevel - 1] ?? 0;
}

export function maxSkillLevel(rarity: HeroRarity): number {
  return SKILL_MEDAL_COSTS[rarity].length + 1;
}

export function skillsUnlocked(
  starLevel: number,
): ("skill1" | "skill2" | "skill3")[] {
  const unlocked: ("skill1" | "skill2" | "skill3")[] = ["skill1"];
  if (starLevel >= 2) unlocked.push("skill2");
  if (starLevel >= 3) unlocked.push("skill3");
  return unlocked;
}

export const TIER_COLORS: Record<string, string> = {
  S: "text-amber-400",
  A: "text-green-400",
  B: "text-blue-400",
  C: "text-gray-400",
  D: "text-gray-600",
};

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
