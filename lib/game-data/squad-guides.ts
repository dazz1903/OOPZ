export type TroopFocus = "Tank" | "Air" | "Missile";
export type CombatRole = "Attacker" | "Defender" | "Support";
export type GuidedHero = {
  name: string;
  skills: Array<{ name: string; priority: 1 | 2 | 3 }>;
};
export const VERIFIED_HERO_ROLES: Record<string, CombatRole> = {
  Kimberly: "Attacker",
  Stetmann: "Attacker",
  Williams: "Defender",
  Murphy: "Defender",
  Marshall: "Support",
  DVA: "Attacker",
  Morrison: "Attacker",
  Lucius: "Defender",
  Carlie: "Defender",
  Schuyler: "Attacker",
  Swift: "Attacker",
  Tesla: "Attacker",
  Adam: "Defender",
  Fiona: "Attacker",
  McGregor: "Defender",
};
export function verifiedHeroRole(
  name: string,
  fallback: "dps" | "tank" | "support" = "dps",
): CombatRole {
  return (
    VERIFIED_HERO_ROLES[name] ??
    (fallback === "tank"
      ? "Defender"
      : fallback === "support"
        ? "Support"
        : "Attacker")
  );
}
export const SQUAD_GUIDES: Record<
  TroopFocus,
  { heroes: GuidedHero[]; starAdvice: string; levelAdvice: string }
> = {
  Tank: {
    heroes: [
      {
        name: "Kimberly",
        skills: [
          { name: "Barrage Strike", priority: 1 },
          { name: "Energy Boost", priority: 2 },
          { name: "Energy Assault", priority: 2 },
        ],
      },
      {
        name: "Stetmann",
        skills: [
          { name: "Lightning Rush", priority: 1 },
          { name: "Orb Lightning", priority: 3 },
        ],
      },
      {
        name: "Williams",
        skills: [
          { name: "Iron Will", priority: 1 },
          { name: "All-Around Armor", priority: 1 },
          { name: "Critical Charge", priority: 2 },
        ],
      },
      {
        name: "Murphy",
        skills: [
          { name: "Ironclad Tactics", priority: 1 },
          { name: "Stand Firm", priority: 2 },
        ],
      },
      {
        name: "Marshall",
        skills: [
          { name: "Command Strategy", priority: 1 },
          { name: "Triad Harmony", priority: 3 },
        ],
      },
    ],
    starAdvice:
      "Kimberly to 5 stars first. Then bring everyone to 4 stars before starting the next 5-star hero.",
    levelAdvice: "Kimberly → Stetmann → Williams → Murphy → Marshall",
  },
  Air: {
    heroes: [
      {
        name: "DVA",
        skills: [
          { name: "Steel Barrage", priority: 1 },
          { name: "Vortex Missile", priority: 2 },
          { name: "Armament Upgrade", priority: 3 },
        ],
      },
      {
        name: "Morrison",
        skills: [
          { name: "Knight's Spirit", priority: 1 },
          { name: "Energy Adaptation", priority: 2 },
          { name: "Lightning Triple Strike", priority: 3 },
        ],
      },
      {
        name: "Lucius",
        skills: [
          { name: "Silver Armor", priority: 1 },
          { name: "Full Firepower", priority: 2 },
          { name: "Dual-string Rocket", priority: 3 },
        ],
      },
      {
        name: "Carlie",
        skills: [
          { name: "Inferno Blaze", priority: 1 },
          { name: "Full-Auto Machine", priority: 2 },
        ],
      },
      {
        name: "Schuyler",
        skills: [
          { name: "Armor-Piercing Shot", priority: 1 },
          { name: "Blast Frenzy", priority: 2 },
          { name: "Lightning Chain", priority: 3 },
          { name: "Antimatter Armor", priority: 3 },
        ],
      },
    ],
    starAdvice:
      "Bring the whole squad to at least 3 stars before pushing individual heroes to 5 stars.",
    levelAdvice: "DVA → Morrison → Lucius → Carlie → Schuyler",
  },
  Missile: {
    heroes: [
      {
        name: "Swift",
        skills: [
          { name: "Targeted Strike", priority: 1 },
          { name: "Precise Guidance", priority: 3 },
        ],
      },
      {
        name: "Tesla",
        skills: [
          { name: "Weakness Targeting", priority: 1 },
          { name: "Lightning Chain", priority: 2 },
          { name: "Electric Power Boost", priority: 3 },
        ],
      },
      {
        name: "Adam",
        skills: [
          { name: "Electric Grid Lockdown", priority: 1 },
          { name: "Combat Defense", priority: 2 },
          { name: "MM41 Vehicle-Mounted Machine Gun", priority: 3 },
        ],
      },
      {
        name: "Fiona",
        skills: [
          { name: "Spike Armor", priority: 1 },
          { name: "Atomic Blast", priority: 2 },
          { name: "Ballistic Boost", priority: 3 },
        ],
      },
      {
        name: "McGregor",
        skills: [
          { name: "Double Trajectory", priority: 1 },
          { name: "Unyielding Heart", priority: 2 },
          { name: "HP Boost", priority: 2 },
          { name: "Forward Rush", priority: 3 },
        ],
      },
    ],
    starAdvice:
      "Work through the recommended order while keeping the full squad developed; do not leave later heroes untouched.",
    levelAdvice: "Swift → Tesla → Adam → Fiona → McGregor",
  },
};

export const GEAR_COSTS = [
  {
    from: "0",
    to: "10",
    gold: 3_200_000,
    ore: 20_800,
    ceramic: 0,
    blueprints: 0,
  },
  {
    from: "10",
    to: "20",
    gold: 5_900_000,
    ore: 38_800,
    ceramic: 0,
    blueprints: 0,
  },
  {
    from: "20",
    to: "30",
    gold: 8_800_000,
    ore: 58_800,
    ceramic: 0,
    blueprints: 0,
  },
  {
    from: "30",
    to: "40",
    gold: 11_200_000,
    ore: 76_200,
    ceramic: 0,
    blueprints: 0,
  },
  {
    from: "40",
    to: "1★",
    gold: 93_600_000,
    ore: 62_500,
    ceramic: 750,
    blueprints: 5,
  },
  {
    from: "1★",
    to: "2★",
    gold: 121_600_000,
    ore: 81_000,
    ceramic: 975,
    blueprints: 10,
  },
  {
    from: "2★",
    to: "3★",
    gold: 150_000_000,
    ore: 100_000,
    ceramic: 1200,
    blueprints: 15,
  },
  {
    from: "3★",
    to: "4★",
    gold: 178_000_000,
    ore: 118_500,
    ceramic: 1425,
    blueprints: 20,
  },
  {
    from: "4★",
    to: "5★",
    gold: 206_000_000,
    ore: 138_000,
    ceramic: 1650,
    blueprints: 10,
    mythic: true,
  },
] as const;
