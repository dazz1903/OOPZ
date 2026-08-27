export type ResourceCost = {
  food: number
  gold: number
  iron: number
  valor: number
  timeHours: number
}

export type T10Node = {
  id: string
  name: string
  levels: ResourceCost[]
  requires?: string[]
}

export const T10_TREE: Record<string, T10Node> = {

  // ===== BASE I =====
  hp_boost_1: {
    id: "hp_boost_1",
    name: "HP Boost I",
    levels: [
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 1300000, gold: 3800000, iron: 1300000, valor: 280, timeHours: 9.18 },
    ]
  },

  attack_boost_1: {
    id: "attack_boost_1",
    name: "Attack Boost I",
    levels: [
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 1300000, gold: 3800000, iron: 1300000, valor: 280, timeHours: 9.18 },
    ]
  },

  defense_boost_1: {
    id: "defense_boost_1",
    name: "Defense Boost I",
    levels: [
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 916100, gold: 2700000, iron: 916100, valor: 240, timeHours: 4.83 },
      { food: 1300000, gold: 3800000, iron: 1300000, valor: 280, timeHours: 9.18 },
    ]
  },

  // ===== ADVANCED PROTECTION I =====
  advanced_protection_1: {
    id: "advanced_protection_1",
    name: "Advanced Protection I",
    requires: ["hp_boost_1", "attack_boost_1", "defense_boost_1"],
    levels: [
      { food: 2300000, gold: 6900000, iron: 2300000, valor: 320, timeHours: 16.52 },
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
    ]
  },

  // ===== TRAINING VII =====
  defense_training_7: {
    id: "defense_training_7",
    name: "Defense Training VII",
    requires: ["advanced_protection_1"],
    levels: [
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
    ]
  },

  weapon_training_7: {
    id: "weapon_training_7",
    name: "Weapon Training VII",
    requires: ["advanced_protection_1"],
    levels: [
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
    ]
  },

  armor_training_7: {
    id: "armor_training_7",
    name: "Advanced Armor VII",
    requires: ["advanced_protection_1"],
    levels: [
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 2900000, gold: 8900000, iron: 2900000, valor: 400, timeHours: 28.08 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
    ]
  },

  // ===== FOCUSED TRAINING =====
  focused_training: {
    id: "focused_training",
    name: "Focused Training I",
    requires: ["defense_training_7", "weapon_training_7", "armor_training_7"],
    levels: [
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
    ]
  },

  // ===== BARRACKS EXPANSION =====
  barracks_expansion: {
    id: "barracks_expansion",
    name: "Barracks Expansion I",
    requires: ["defense_training_7", "weapon_training_7", "armor_training_7"],
    levels: [
      { food: 5100000, gold: 15500000, iron: 5100000, valor: 520, timeHours: 44.92 },
    ]
  },

  // ===== BOOST II =====
  hp_boost_2: {
    id: "hp_boost_2",
    name: "HP Boost II",
    requires: ["focused_training", "barracks_expansion"],
    levels: [
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
    ]
  },

  attack_boost_2: {
    id: "attack_boost_2",
    name: "Attack Boost II",
    requires: ["focused_training", "barracks_expansion"],
    levels: [
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
    ]
  },

  defense_boost_2: {
    id: "defense_boost_2",
    name: "Defense Boost II",
    requires: ["focused_training", "barracks_expansion"],
    levels: [
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
      { food: 11100000, gold: 33600000, iron: 11100000, valor: 800, timeHours: 94.33 },
    ]
  },

  // ===== MORALE =====
  morale: {
    id: "morale",
    name: "Morale",
    requires: ["hp_boost_2", "attack_boost_2", "defense_boost_2"],
    levels: [
      { food: 15600000, gold: 47100000, iron: 15600000, valor: 960, timeHours: 132.07 },
      { food: 20400000, gold: 61300000, iron: 20400000, valor: 1120, timeHours: 171.02 },
      { food: 20400000, gold: 61300000, iron: 20400000, valor: 1120, timeHours: 171.02 },
    ]
  },

  // ===== TRAINING VIII =====
  defense_training_8: {
    id: "defense_training_8",
    name: "Defense Training VIII",
    requires: ["morale"],
    levels: [
      { food: 20100000, gold: 60300000, iron: 20100000, valor: 1120, timeHours: 171.02 },
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
    ]
  },

  weapon_training_8: {
    id: "weapon_training_8",
    name: "Weapon Training VIII",
    requires: ["morale"],
    levels: [
      { food: 20100000, gold: 60300000, iron: 20100000, valor: 1120, timeHours: 171.02 },
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
    ]
  },

  armor_training_8: {
    id: "armor_training_8",
    name: "Advanced Armor VIII",
    requires: ["morale"],
    levels: [
      { food: 20100000, gold: 60300000, iron: 20100000, valor: 1120, timeHours: 171.02 },
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
    ]
  },

  // ===== RAPID FIELD DRESSING & INFIRMARY =====
  rapid_field_dressing: {
    id: "rapid_field_dressing",
    name: "Rapid Field Dressing I",
    requires: ["defense_training_8", "weapon_training_8", "armor_training_8"],
    levels: [
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
    ]
  },

  infirmary_expansion: {
    id: "infirmary_expansion",
    name: "Infirmary Expansion I",
    requires: ["defense_training_8", "weapon_training_8", "armor_training_8"],
    levels: [
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
    ]
  },

  // ===== ADVANCED PROTECTION II =====
  advanced_protection_2: {
    id: "advanced_protection_2",
    name: "Advanced Protection II",
    requires: ["rapid_field_dressing", "infirmary_expansion"],
    levels: [
      { food: 25500000, gold: 76600000, iron: 25500000, valor: 1280, timeHours: 223.18 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
    ]
  },

  // ===== BOOST III =====
  hp_boost_3: {
    id: "hp_boost_3",
    name: "HP Boost III",
    requires: ["advanced_protection_2"],
    levels: [
      { food: 31900000, gold: 95700000, iron: 31900000, valor: 1440, timeHours: 267.82 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
      { food: 193400000, gold: 580300000, iron: 193400000, valor: 2400, timeHours: 666.67 },
    ]
  },

  attack_boost_3: {
    id: "attack_boost_3",
    name: "Attack Boost III",
    requires: ["advanced_protection_2"],
    levels: [
      { food: 31900000, gold: 95700000, iron: 31900000, valor: 1440, timeHours: 267.82 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
      { food: 193400000, gold: 580300000, iron: 193400000, valor: 2400, timeHours: 666.67 },
    ]
  },

  defense_boost_3: {
    id: "defense_boost_3",
    name: "Defense Boost III",
    requires: ["advanced_protection_2"],
    levels: [
      { food: 31900000, gold: 95700000, iron: 31900000, valor: 1440, timeHours: 267.82 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 54200000, gold: 162700000, iron: 54200000, valor: 1600, timeHours: 321.38 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 75900000, gold: 227700000, iron: 75900000, valor: 1800, timeHours: 385.65 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 98700000, gold: 296000000, iron: 98700000, valor: 2000, timeHours: 462.78 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
      { food: 138100000, gold: 414600000, iron: 138100000, valor: 2200, timeHours: 556.53 },
      { food: 193400000, gold: 580300000, iron: 193400000, valor: 2400, timeHours: 666.67 },
    ]
  },

  // ===== FINAL =====
  t10: {
    id: "t10",
    name: "Unit X",
    requires: ["hp_boost_3", "attack_boost_3", "defense_boost_3"],
    levels: [
      { food: 193400000, gold: 580300000, iron: 193400000, valor: 2400, timeHours: 666.67 },
    ]
  },
}
