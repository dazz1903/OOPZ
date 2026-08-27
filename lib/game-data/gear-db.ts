// Last War: Survival — T1 Legion Gear Tracker
// Covers: Tanks, Air, Missile unit types

export type UnitType = 'tank' | 'air' | 'missile';
export type GearSlot = 'Gun' | 'Radar' | 'Data Chip' | 'Armor';

export const UNIT_HEROES: Record<UnitType, string[]> = {
  tank:    ['Kim', 'Stetmann', 'Marshall', 'Williams', 'Murphy'],
  air:     ['DVA', 'Morrison', 'Schuyler', 'Lucius', 'Carly'],
  missile: ['Swift', 'Tesla', 'Fiona', 'Adam', 'McGregor'],
};

// Hero roles by position (same across all unit types)
export const HERO_ROLES = ['Primary', 'Primary', 'Support', 'Secondary', 'Secondary'];

export const GEAR_SLOTS: GearSlot[] = ['Gun', 'Radar', 'Data Chip', 'Armor'];

// Level upgrade costs (coin and ore per level)
export const LEVEL_COSTS: Record<number, { coin: number; ore: number }> = {
  1:  { coin: 225000,  ore: 1500 },
  2:  { coin: 225000,  ore: 1500 },
  3:  { coin: 225000,  ore: 1500 },
  4:  { coin: 225000,  ore: 1500 },
  5:  { coin: 337500,  ore: 2200 },
  6:  { coin: 337500,  ore: 2200 },
  7:  { coin: 337500,  ore: 2200 },
  8:  { coin: 337500,  ore: 2200 },
  9:  { coin: 450000,  ore: 3000 },
  10: { coin: 450000,  ore: 3000 },
  11: { coin: 450000,  ore: 3000 },
  12: { coin: 450000,  ore: 3000 },
  13: { coin: 562500,  ore: 3700 },
  14: { coin: 562500,  ore: 3700 },
  15: { coin: 562500,  ore: 3700 },
  16: { coin: 562500,  ore: 3700 },
  17: { coin: 675000,  ore: 4500 },
  18: { coin: 675000,  ore: 4500 },
  19: { coin: 675000,  ore: 4500 },
  20: { coin: 675000,  ore: 4500 },
  21: { coin: 787500,  ore: 5200 },
  22: { coin: 787500,  ore: 5200 },
  23: { coin: 787500,  ore: 5200 },
  24: { coin: 787500,  ore: 5200 },
  25: { coin: 900000,  ore: 6000 },
  26: { coin: 900000,  ore: 6000 },
  27: { coin: 900000,  ore: 6000 },
  28: { coin: 900000,  ore: 6000 },
  29: { coin: 1000000, ore: 6700 },
  30: { coin: 1000000, ore: 6700 },
  31: { coin: 1000000, ore: 6700 },
  32: { coin: 1000000, ore: 6700 },
  33: { coin: 1100000, ore: 7500 },
  34: { coin: 1100000, ore: 7500 },
  35: { coin: 1100000, ore: 7500 },
  36: { coin: 1100000, ore: 7500 },
  37: { coin: 1200000, ore: 8200 },
  38: { coin: 1200000, ore: 8200 },
  39: { coin: 1200000, ore: 8200 },
  40: { coin: 1200000, ore: 8200 },
};

// Star promotion costs
export const STAR_COSTS: Record<string, { coin: number; ore: number; blueprints: number; mythicBlueprints: number }> = {
  '1★': { coin: 93600000,  ore: 62500,  blueprints: 5,  mythicBlueprints: 0 },
  '2★': { coin: 121600000, ore: 81000,  blueprints: 10, mythicBlueprints: 0 },
  '3★': { coin: 150000000, ore: 100000, blueprints: 15, mythicBlueprints: 0 },
  '4★': { coin: 178000000, ore: 118500, blueprints: 20, mythicBlueprints: 0 },
  '5★': { coin: 206000000, ore: 137500, blueprints: 0,  mythicBlueprints: 10 },
};

// Calculate cost to level from startLevel+1 to endLevel
export function calcLevelCost(fromLevel: number, toLevel: number): { coin: number; ore: number } {
  let coin = 0;
  let ore = 0;
  for (let l = fromLevel + 1; l <= toLevel; l++) {
    coin += LEVEL_COSTS[l]?.coin ?? 0;
    ore += LEVEL_COSTS[l]?.ore ?? 0;
  }
  return { coin, ore };
}

// The 29 upgrade steps (same for all unit types, heroes substituted)
// Hero position: 0=Kim/DVA/Swift, 1=Stetmann/Morrison/Tesla, 2=Marshall/Schuyler/Fiona, 3=Williams/Lucius/Adam, 4=Murphy/Carly/McGregor
export interface GearStep {
  step: number;
  heroPositions: number[]; // indices into UNIT_HEROES[unitType]
  slot: GearSlot | 'All gear';
  target: string;
  qty: number;
  coinCost: number;
  oreCost: number;
  blueprints: number;
  mythicBlueprints: number;
  note?: string;
}

export const GEAR_STEPS: GearStep[] = [
  { step: 1,  heroPositions: [0,1,2,3,4], slot: 'All gear',  target: 'Level 10', qty: 20, coinCost: 63000000,   oreCost: 416000,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 2,  heroPositions: [0,1],       slot: 'Gun',        target: 'Level 40', qty: 2,  coinCost: 51600000,   oreCost: 346400,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 3,  heroPositions: [0,1],       slot: 'Gun',        target: 'Level 40', qty: 2,  coinCost: 0,           oreCost: 0,       blueprints: 0,  mythicBlueprints: 0, note: 'Duplicate step — no additional cost' },
  { step: 4,  heroPositions: [0,1],       slot: 'Data Chip',  target: 'Level 40', qty: 2,  coinCost: 51600000,   oreCost: 346400,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 5,  heroPositions: [3,4],       slot: 'Armor',      target: 'Level 20', qty: 2,  coinCost: 11700000,   oreCost: 77600,   blueprints: 0,  mythicBlueprints: 0 },
  { step: 6,  heroPositions: [0,1],       slot: 'Gun',        target: '1★',       qty: 2,  coinCost: 187200000,  oreCost: 125000,  blueprints: 10, mythicBlueprints: 0 },
  { step: 7,  heroPositions: [2],         slot: 'Gun',        target: 'Level 20', qty: 1,  coinCost: 5850000,    oreCost: 38800,   blueprints: 0,  mythicBlueprints: 0 },
  { step: 8,  heroPositions: [0,1],       slot: 'Data Chip',  target: '1★',       qty: 2,  coinCost: 187200000,  oreCost: 125000,  blueprints: 10, mythicBlueprints: 0 },
  { step: 9,  heroPositions: [2],         slot: 'Data Chip',  target: 'Level 20', qty: 1,  coinCost: 5850000,    oreCost: 38800,   blueprints: 0,  mythicBlueprints: 0 },
  { step: 10, heroPositions: [0,1,2],     slot: 'Radar',      target: 'Level 20', qty: 3,  coinCost: 17550000,   oreCost: 116400,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 11, heroPositions: [3,4],       slot: 'Armor',      target: 'Level 40', qty: 2,  coinCost: 39900000,   oreCost: 268800,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 12, heroPositions: [0,1],       slot: 'Gun',        target: '4★',       qty: 2,  coinCost: 899200000,  oreCost: 599000,  blueprints: 60, mythicBlueprints: 0 },
  { step: 13, heroPositions: [0,1,2],     slot: 'Radar',      target: 'Level 40', qty: 3,  coinCost: 59850000,   oreCost: 403200,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 14, heroPositions: [0,1,2],     slot: 'Armor',      target: 'Level 40', qty: 3,  coinCost: 77400000,   oreCost: 519600,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 15, heroPositions: [3,4],       slot: 'Radar',      target: '5★',       qty: 2,  coinCost: 1550000000, oreCost: 1345400, blueprints: 100, mythicBlueprints: 20 },
  { step: 16, heroPositions: [0,1],       slot: 'Data Chip',  target: '4★',       qty: 2,  coinCost: 899200000,  oreCost: 599000,  blueprints: 60, mythicBlueprints: 0 },
  { step: 17, heroPositions: [3,4],       slot: 'Data Chip',  target: 'Level 40', qty: 2,  coinCost: 51600000,   oreCost: 346400,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 18, heroPositions: [3,4],       slot: 'Gun',        target: 'Level 40', qty: 2,  coinCost: 51600000,   oreCost: 346400,  blueprints: 0,  mythicBlueprints: 0 },
  { step: 19, heroPositions: [0,1,2,3,4], slot: 'All gear',   target: '1★',       qty: 20, coinCost: 1310400000, oreCost: 875000,  blueprints: 100, mythicBlueprints: 0 },
  { step: 20, heroPositions: [3,4],       slot: 'Armor',      target: '4★',       qty: 2,  coinCost: 899200000,  oreCost: 599000,  blueprints: 60, mythicBlueprints: 0 },
  { step: 21, heroPositions: [0,1,2],     slot: 'Radar',      target: '4★',       qty: 3,  coinCost: 1348800000, oreCost: 898500,  blueprints: 90, mythicBlueprints: 0 },
  { step: 22, heroPositions: [3,4],       slot: 'Armor',      target: '5★',       qty: 2,  coinCost: 412000000,  oreCost: 275000,  blueprints: 0,  mythicBlueprints: 20 },
  { step: 23, heroPositions: [0,1,2],     slot: 'Armor',      target: '4★',       qty: 3,  coinCost: 1348800000, oreCost: 898500,  blueprints: 90, mythicBlueprints: 0 },
  { step: 24, heroPositions: [0,1,2],     slot: 'Radar',      target: '5★',       qty: 3,  coinCost: 618000000,  oreCost: 412500,  blueprints: 0,  mythicBlueprints: 30 },
  { step: 25, heroPositions: [3,4],       slot: 'Data Chip',  target: '5★',       qty: 2,  coinCost: 1311200000, oreCost: 874000,  blueprints: 0,  mythicBlueprints: 20 },
  { step: 26, heroPositions: [0,1,2],     slot: 'Data Chip',  target: '5★',       qty: 3,  coinCost: 1087550000, oreCost: 846400,  blueprints: 0,  mythicBlueprints: 30 },
  { step: 27, heroPositions: [0,1,2],     slot: 'Armor',      target: '5★',       qty: 3,  coinCost: 618000000,  oreCost: 412500,  blueprints: 0,  mythicBlueprints: 30 },
  { step: 28, heroPositions: [0,1,2],     slot: 'Gun',        target: '5★',       qty: 3,  coinCost: 1087550000, oreCost: 846400,  blueprints: 0,  mythicBlueprints: 30 },
  { step: 29, heroPositions: [3,4],       slot: 'Gun',        target: '5★',       qty: 2,  coinCost: 1311200000, oreCost: 874000,  blueprints: 0,  mythicBlueprints: 20 },
];

export function getStepLabel(step: GearStep, unitType: UnitType): string {
  const heroes = UNIT_HEROES[unitType];
  if (step.heroPositions.length === heroes.length) {
    return `ALL heroes — ${step.slot} to ${step.target}`;
  }
  const heroNames = step.heroPositions.map(i => heroes[i]).join(', ');
  return `${heroNames} — ${step.slot} to ${step.target}`;
}

export function calcTotals(completedSteps: number[]) {
  const completedSet = new Set(completedSteps);
  let totalCoin = 0, totalOre = 0, totalBp = 0, totalMythic = 0;
  let doneCoin = 0, doneOre = 0, doneBp = 0, doneMythic = 0;

  for (const step of GEAR_STEPS) {
    totalCoin += step.coinCost;
    totalOre += step.oreCost;
    totalBp += step.blueprints;
    totalMythic += step.mythicBlueprints;
    if (completedSet.has(step.step)) {
      doneCoin += step.coinCost;
      doneOre += step.oreCost;
      doneBp += step.blueprints;
      doneMythic += step.mythicBlueprints;
    }
  }

  return {
    total: { coin: totalCoin, ore: totalOre, blueprints: totalBp, mythicBlueprints: totalMythic },
    done: { coin: doneCoin, ore: doneOre, blueprints: doneBp, mythicBlueprints: doneMythic },
    remaining: {
      coin: totalCoin - doneCoin,
      ore: totalOre - doneOre,
      blueprints: totalBp - doneBp,
      mythicBlueprints: totalMythic - doneMythic,
    },
    progress: GEAR_STEPS.length > 0 ? completedSteps.length / GEAR_STEPS.length : 0,
  };
}

export function getAffordableSteps(
  completedSteps: number[],
  coin: number,
  ore: number,
  blueprints: number,
  mythicBlueprints: number,
): number[] {
  const completedSet = new Set(completedSteps);
  const affordable: number[] = [];
  let remainingCoin = coin;
  let remainingOre = ore;
  let remainingBp = blueprints;
  let remainingMythic = mythicBlueprints;

  for (const step of GEAR_STEPS) {
    if (completedSet.has(step.step)) continue;
    if (
      remainingCoin >= step.coinCost &&
      remainingOre >= step.oreCost &&
      remainingBp >= step.blueprints &&
      remainingMythic >= step.mythicBlueprints
    ) {
      affordable.push(step.step);
      remainingCoin -= step.coinCost;
      remainingOre -= step.oreCost;
      remainingBp -= step.blueprints;
      remainingMythic -= step.mythicBlueprints;
    }
  }
  return affordable;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
