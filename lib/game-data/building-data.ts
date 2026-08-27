/**
 * Building advisor engine for Last War: Survival
 *
 * Rules:
 * - No building can exceed HQ level
 * - HQ upgrades require specific buildings to be at certain levels first
 * - Levels 31-35 require "Age of Oil" (available after Season 2)
 */

// HQ prerequisite table
// Source: prerequisites for unlocking HQ levels infographic

export interface HQRequirement {
  building: string
  level: number
}

export const HQ_PREREQUISITES: Record<number, HQRequirement[]> = {
  1:  [],
  2:  [{ building: 'Drill Ground', level: 1 }, { building: 'Parking Lot', level: 1 }],
  3:  [{ building: 'Wall', level: 2 }],
  4:  [{ building: 'Barracks', level: 3 }, { building: 'Drill Ground', level: 3 }],
  5:  [{ building: 'Wall', level: 4 }, { building: 'Barracks', level: 4 }],
  6:  [{ building: 'Wall', level: 5 }, { building: 'Drill Ground', level: 5 }],
  7:  [{ building: 'Wall', level: 6 }, { building: 'Tank Center', level: 6 }],
  8:  [{ building: 'Tech Center', level: 7 }, { building: 'Alliance Center', level: 7 }],
  9:  [{ building: 'Tech Center', level: 8 }, { building: 'Tank Center', level: 8 }],
  10: [{ building: 'Tech Center', level: 9 }, { building: 'Hospital', level: 9 }],
  11: [{ building: 'Tech Center', level: 10 }, { building: 'Wall', level: 10 }],
  12: [{ building: 'Tech Center', level: 11 }, { building: 'Barracks', level: 11 }],
  13: [{ building: 'Tech Center', level: 12 }, { building: 'Tank Center', level: 12 }],
  14: [{ building: 'Tech Center', level: 13 }, { building: 'Drill Ground', level: 13 }],
  15: [{ building: 'Tech Center', level: 14 }, { building: 'Wall', level: 14 }],
  16: [{ building: 'Tech Center', level: 15 }, { building: 'Alliance Center', level: 15 }],
  17: [{ building: 'Tech Center', level: 16 }, { building: 'Tank Center', level: 16 }],
  18: [{ building: 'Tech Center', level: 17 }, { building: 'Hospital', level: 17 }],
  19: [{ building: 'Tech Center', level: 18 }, { building: 'Wall', level: 18 }],
  20: [{ building: 'Tech Center', level: 19 }, { building: 'Barracks', level: 19 }],
  21: [{ building: 'Tech Center', level: 20 }, { building: 'Tank Center', level: 20 }],
  22: [{ building: 'Tech Center', level: 21 }, { building: 'Drill Ground', level: 21 }],
  23: [{ building: 'Tech Center', level: 22 }, { building: 'Wall', level: 22 }],
  24: [{ building: 'Tech Center', level: 23 }, { building: 'Alliance Center', level: 23 }],
  25: [{ building: 'Tech Center', level: 24 }, { building: 'Tank Center', level: 24 }],
  26: [{ building: 'Tech Center', level: 25 }, { building: 'Hospital', level: 25 }],
  27: [{ building: 'Tech Center', level: 26 }, { building: 'Wall', level: 26 }],
  28: [{ building: 'Tech Center', level: 27 }, { building: 'Barracks', level: 27 }],
  29: [{ building: 'Tech Center', level: 28 }, { building: 'Tank Center', level: 28 }],
  30: [{ building: 'Tech Center', level: 29 }, { building: 'Drill Ground', level: 29 }],
  31: [{ building: 'Tech Center', level: 30 }, { building: 'Tank Center', level: 30 }, { building: 'Barracks', level: 30 }],
  32: [{ building: 'Tech Center', level: 31 }, { building: 'Tank Center', level: 31 }, { building: 'Barracks', level: 31 }, { building: 'Wall', level: 31 }],
  33: [{ building: 'Tech Center', level: 32 }, { building: 'Tank Center', level: 32 }, { building: 'Barracks', level: 32 }, { building: 'Hospital', level: 32 }, { building: 'Drill Ground', level: 32 }],
  34: [{ building: 'Tech Center', level: 33 }, { building: 'Tank Center', level: 33 }, { building: 'Barracks', level: 33 }, { building: 'Alliance Center', level: 33 }],
  35: [{ building: 'Tech Center', level: 34 }, { building: 'Tank Center', level: 34 }, { building: 'Barracks', level: 34 }, { building: 'Hospital', level: 34 }, { building: 'Drill Ground', level: 34 }],
}

export type BuildingCategory = 'combat' | 'economy' | 'hero' | 'support'

export interface BuildingDef {
  name: string
  maxLevel: number
  category: BuildingCategory
  priority: 1 | 2 | 3
  requiresAgeOfOil: boolean
  hqUnlockLevel: number
  buff?: string
}

export const BUILDINGS: BuildingDef[] = [
  { name: 'Tech Center', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 7, buff: 'Research speed' },
  { name: 'Tank Center', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 6, buff: 'Tank training & attack' },
  { name: 'Wall', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'City defense HP & fortification' },
  { name: 'Barracks', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Infantry training capacity & speed' },
  { name: 'Drill Ground', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'March slots & speed' },
  { name: 'Hospital', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 2, buff: 'Hospital beds & healing speed' },
  { name: 'Alliance Center', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 4, buff: 'Alliance donations & healing bonus' },
  { name: 'Parking Lot', maxLevel: 35, category: 'combat', priority: 1, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'March queue capacity' },
  { name: 'Air Center', maxLevel: 35, category: 'hero', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 12, buff: 'Aircraft training & stats' },
  { name: 'Missile Center', maxLevel: 35, category: 'hero', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 11, buff: 'Missile training & stats' },
  { name: 'Tavern', maxLevel: 35, category: 'hero', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Hero recruitment & star-up slots' },
  { name: 'Alert Tower', maxLevel: 35, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 10, buff: 'Scout range & detection speed' },
  { name: "Builder's Hut", maxLevel: 35, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Construction speed' },
  { name: 'Emergency Center', maxLevel: 35, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 22, buff: 'Emergency mobilisation speed' },
  { name: 'Gear Factory', maxLevel: 34, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 9, buff: 'Gear assembly speed & slots' },
  { name: 'Chip Lab', maxLevel: 35, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 5, buff: 'Chip production rate' },
  { name: 'Smelter', maxLevel: 35, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 6, buff: 'Iron production rate' },
  { name: 'Squad', maxLevel: 35, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Squad formation slots' },
  { name: 'Armament Institute', maxLevel: 1, category: 'support', priority: 2, requiresAgeOfOil: false, hqUnlockLevel: 27, buff: 'Special armament abilities' },
  { name: 'Component Factory', maxLevel: 35, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 15, buff: 'Component production' },
  { name: 'Drone Parts Workshop', maxLevel: 35, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Drone parts production' },
  { name: 'Material Workshop', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 11, buff: 'Material production' },
  { name: 'Training Base', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Troop training capacity' },
  { name: 'Farmland', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Food production' },
  { name: 'Gold Mine', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Gold production' },
  { name: 'Iron Mine', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Iron production' },
  { name: 'Oil Well', maxLevel: 35, category: 'economy', priority: 3, requiresAgeOfOil: true, hqUnlockLevel: 1, buff: 'Oil production (Age of Oil)' },
  { name: 'Coin Vault', maxLevel: 35, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 15, buff: 'Coin storage capacity' },
  { name: 'Food Warehouse', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Food storage capacity' },
  { name: 'Iron Warehouse', maxLevel: 30, category: 'economy', priority: 3, requiresAgeOfOil: false, hqUnlockLevel: 1, buff: 'Iron storage capacity' },
]

export const BUILDING_MAP = new Map(BUILDINGS.map(b => [b.name, b]))

export type AdviceReason =
  | 'blocks_next_hq'
  | 'blocks_hq_in_2'
  | 'blocks_hq_in_3'
  | 'below_hq_cap'
  | 'not_unlocked'

export interface BuildingAdvice {
  building: string
  currentLevel: number
  targetLevel: number
  hqCapLevel: number
  reason: AdviceReason
  priority: 1 | 2 | 3
  requiresAgeOfOil: boolean
  gapsToClose: number
}

export function getBuildingAdvice(
  currentHQ: number,
  buildingLevels: Record<string, number>,
): BuildingAdvice[] {
  const advice: BuildingAdvice[] = []
  const seen = new Set<string>()

  function addAdvice(
    building: string,
    targetLevel: number,
    reason: AdviceReason,
  ) {
    if (seen.has(building)) return
    seen.add(building)
    const def = BUILDING_MAP.get(building)
    const currentLevel = buildingLevels[building] ?? 0
    const hqCapLevel = Math.min(currentHQ, def?.maxLevel ?? currentHQ)
    if (currentLevel >= targetLevel) return
    advice.push({
      building,
      currentLevel,
      targetLevel,
      hqCapLevel,
      reason,
      priority: (def?.priority ?? 3) as 1 | 2 | 3,
      requiresAgeOfOil: targetLevel >= 31,
      gapsToClose: targetLevel - currentLevel,
    })
  }

  const nextHQ = currentHQ + 1
  if (nextHQ <= 35) {
    for (const req of HQ_PREREQUISITES[nextHQ] ?? []) {
      addAdvice(req.building, req.level, 'blocks_next_hq')
    }
  }

  for (const futureHQ of [nextHQ + 1, nextHQ + 2]) {
    if (futureHQ > 35) break
    const reason: AdviceReason = futureHQ === nextHQ + 1 ? 'blocks_hq_in_2' : 'blocks_hq_in_3'
    for (const req of HQ_PREREQUISITES[futureHQ] ?? []) {
      addAdvice(req.building, req.level, reason)
    }
  }

  const sortedBuildings = [...BUILDINGS].sort((a, b) => a.priority - b.priority)
  for (const def of sortedBuildings) {
    if (def.hqUnlockLevel > currentHQ) continue
    const current = buildingLevels[def.name] ?? 0
    const cap = Math.min(currentHQ, def.maxLevel)
    if (current < cap) {
      addAdvice(def.name, cap, 'below_hq_cap')
    }
  }

  const ORDER: Record<AdviceReason, number> = {
    blocks_next_hq: 0,
    blocks_hq_in_2: 1,
    blocks_hq_in_3: 2,
    below_hq_cap: 3,
    not_unlocked: 4,
  }

  advice.sort((a, b) => {
    if (ORDER[a.reason] !== ORDER[b.reason]) return ORDER[a.reason] - ORDER[b.reason]
    if (a.priority !== b.priority) return a.priority - b.priority
    return b.gapsToClose - a.gapsToClose
  })

  return advice
}
