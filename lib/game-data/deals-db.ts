// Last War: Survival — Purchase Engine Database
// Source: last_war_purchase_engine_elite.xlsx

export type Focus = 'Drone' | 'T10' | 'Hero' | 'Balanced' | 'VS' | 'PvP';

export interface StoreItem {
  store: string;
  item: string;
  category: string;
  currency: string;
  cost: number;
  qty: number;
  availability_type: string;
  availability_detail: string;
  base_value: number;
  weight_multiplier: number;
  notes: string;
}

export interface CurrencyPack {
  store: string;
  pack_name: string;
  availability_type: string;
  eur: number;
  currency: string;
  amount: number;
  purchases_per_period: string;
  notes: string;
}

export interface ScoredItem extends StoreItem {
  adjusted_score: number;
  decision: 'Buy' | 'Consider' | 'Skip';
  why: string;
}

export const STORE_ITEMS: StoreItem[] = [
  { store: 'Black Market', item: 'Drone Parts', category: 'Drone', currency: 'Black Market Cash', cost: 400, qty: 20, availability_type: 'Event', availability_detail: 'Black Market', base_value: 12, weight_multiplier: 1, notes: '' },
  { store: 'Black Market', item: 'Valor Badge', category: 'Valor', currency: 'Black Market Cash', cost: 500, qty: 50, availability_type: 'Event', availability_detail: 'Black Market', base_value: 14, weight_multiplier: 1, notes: '' },
  { store: 'Black Market', item: 'Armament Core', category: 'T10', currency: 'Black Market Cash', cost: 150, qty: 5, availability_type: 'Event', availability_detail: 'Black Market', base_value: 12, weight_multiplier: 1, notes: '' },
  { store: 'Black Market', item: 'Upgrade Ore', category: 'Gear', currency: 'Black Market Cash', cost: 100, qty: 800, availability_type: 'Event', availability_detail: 'Black Market', base_value: 11, weight_multiplier: 1, notes: '' },
  { store: 'Black Market', item: 'Skill Medal', category: 'Hero', currency: 'Black Market Cash', cost: 100, qty: 1000, availability_type: 'Event', availability_detail: 'Black Market', base_value: 10, weight_multiplier: 1, notes: '' },
  { store: 'Black Market', item: '5m Speed-up', category: 'Speedups', currency: 'Black Market Cash', cost: 10, qty: 12, availability_type: 'Event', availability_detail: 'Black Market', base_value: 1, weight_multiplier: 1, notes: '' },
  { store: 'Total Mobilization', item: 'UR Hero Universal Shard', category: 'Hero', currency: 'Mobilization Coupons', cost: 10, qty: 10, availability_type: 'Daily', availability_detail: 'Any', base_value: 18, weight_multiplier: 1, notes: '' },
  { store: 'Total Mobilization', item: 'Overlord Skill Badge', category: 'Hero', currency: 'Mobilization Coupons', cost: 1, qty: 150, availability_type: 'Event', availability_detail: 'Total Mobilization', base_value: 8, weight_multiplier: 1, notes: '' },
  { store: 'Total Mobilization', item: 'Lv 5 Drone Component Chest', category: 'Drone', currency: 'Mobilization Coupons', cost: 30, qty: 1, availability_type: 'Event', availability_detail: 'Total Mobilization', base_value: 28, weight_multiplier: 1, notes: 'Must-buy tier' },
  { store: 'Total Mobilization', item: 'Training Certificate', category: 'Training', currency: 'Mobilization Coupons', cost: 20, qty: 10, availability_type: 'Event', availability_detail: 'Total Mobilization', base_value: 8, weight_multiplier: 1, notes: '' },
  { store: 'Total Mobilization', item: 'Drone Parts', category: 'Drone', currency: 'Mobilization Coupons', cost: 22, qty: 10, availability_type: 'Event', availability_detail: 'Total Mobilization', base_value: 12, weight_multiplier: 1, notes: '' },
  { store: 'Total Mobilization', item: 'Valor Badge', category: 'Valor', currency: 'Mobilization Coupons', cost: 50, qty: 100, availability_type: 'Event', availability_detail: 'Total Mobilization', base_value: 14, weight_multiplier: 1, notes: '' },
  { store: 'Total Mobilization', item: '1h Speed-up', category: 'Speedups', currency: 'Mobilization Coupons', cost: 20, qty: 10, availability_type: 'Event', availability_detail: 'Total Mobilization', base_value: 8, weight_multiplier: 1, notes: '' },
  { store: 'Glittering Market', item: 'Hero Choice Chest', category: 'Hero', currency: 'Glittering Coins', cost: 60, qty: 10, availability_type: 'Daily', availability_detail: 'Any', base_value: 16, weight_multiplier: 1, notes: 'Daily offer' },
  { store: 'Glittering Market', item: 'Dielectric Ceramic', category: 'T10', currency: 'Glittering Coins', cost: 40, qty: 100, availability_type: 'Daily', availability_detail: 'Any', base_value: 9, weight_multiplier: 1, notes: 'Daily offer' },
  { store: 'Glittering Market', item: 'UR Hero Universal Shard', category: 'Hero', currency: 'Glittering Coins', cost: 10, qty: 1, availability_type: 'Event', availability_detail: 'Glittering Market', base_value: 18, weight_multiplier: 1, notes: '' },
  { store: 'Glittering Market', item: 'Skill Medal', category: 'Hero', currency: 'Glittering Coins', cost: 120, qty: 10000, availability_type: 'Event', availability_detail: 'Glittering Market', base_value: 10, weight_multiplier: 1, notes: '' },
  { store: 'Glittering Market', item: 'Valor Badge', category: 'Valor', currency: 'Glittering Coins', cost: 50, qty: 100, availability_type: 'Event', availability_detail: 'Glittering Market', base_value: 14, weight_multiplier: 1, notes: '' },
  { store: 'Glittering Market', item: 'Upgrade Ore', category: 'Gear', currency: 'Glittering Coins', cost: 250, qty: 10000, availability_type: 'Event', availability_detail: 'Glittering Market', base_value: 11, weight_multiplier: 1, notes: '' },
  { store: 'Glittering Market', item: 'Gear Blueprint (UR)', category: 'Blueprint', currency: 'Glittering Coins', cost: 60, qty: 1, availability_type: 'Event', availability_detail: 'Glittering Market', base_value: 14, weight_multiplier: 1, notes: '' },
  { store: 'Glittering Market', item: 'Resource Choice Chest (UR)', category: 'Resources', currency: 'Glittering Coins', cost: 5, qty: 1, availability_type: 'Event', availability_detail: 'Glittering Market', base_value: 6, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: 'Lv 5 Drone Component Chest', category: 'Drone', currency: 'Bounty Voucher', cost: 80, qty: 1, availability_type: 'Daily', availability_detail: 'Any', base_value: 28, weight_multiplier: 1, notes: 'Must-buy' },
  { store: 'Bounty Hunter', item: 'Training Certificate', category: 'Training', currency: 'Bounty Voucher', cost: 20, qty: 10, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 8, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: 'Drone Parts', category: 'Drone', currency: 'Bounty Voucher', cost: 22, qty: 10, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 12, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: 'Training Guidebook', category: 'Training', currency: 'Bounty Voucher', cost: 3, qty: 1000, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 4, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: 'Valor Badge', category: 'Valor', currency: 'Bounty Voucher', cost: 50, qty: 100, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 14, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: 'Resource Choice Chest (UR)', category: 'Resources', currency: 'Bounty Voucher', cost: 5, qty: 10, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 6, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: '1h Speed-up', category: 'Speedups', currency: 'Bounty Voucher', cost: 20, qty: 10, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 8, weight_multiplier: 1, notes: '' },
  { store: 'Bounty Hunter', item: 'Skill Medal', category: 'Hero', currency: 'Bounty Voucher', cost: 15, qty: 1000, availability_type: 'Event', availability_detail: 'Bounty Hunter', base_value: 10, weight_multiplier: 1, notes: '' },
  { store: 'Bullseye Loot', item: 'Upgrade Ore (Lv milestone proxy)', category: 'Gear', currency: 'Ammo', cost: 1, qty: 1, availability_type: 'Event', availability_detail: 'Bullseye Loot', base_value: 11, weight_multiplier: 0.6, notes: 'Approximate via progression' },
];

export const CATEGORY_WEIGHTS: Record<string, Record<Focus, number>> = {
  Drone:     { Drone: 1.5, T10: 1.0, Hero: 0.8, Balanced: 1.2, VS: 1.2, PvP: 0.8 },
  Valor:     { Drone: 1.0, T10: 1.5, Hero: 0.8, Balanced: 1.1, VS: 1.3, PvP: 1.0 },
  Hero:      { Drone: 0.8, T10: 0.9, Hero: 1.5, Balanced: 1.1, VS: 1.0, PvP: 1.2 },
  Speedups:  { Drone: 0.8, T10: 1.2, Hero: 0.8, Balanced: 1.0, VS: 1.2, PvP: 1.0 },
  Resources: { Drone: 0.7, T10: 1.0, Hero: 0.7, Balanced: 0.8, VS: 0.9, PvP: 0.7 },
  Decor:     { Drone: 0.4, T10: 0.4, Hero: 0.4, Balanced: 0.4, VS: 0.3, PvP: 0.3 },
  Blueprint: { Drone: 0.9, T10: 1.1, Hero: 0.8, Balanced: 1.0, VS: 0.7, PvP: 0.9 },
  Gear:      { Drone: 0.8, T10: 1.0, Hero: 0.8, Balanced: 0.9, VS: 0.8, PvP: 1.0 },
  Training:  { Drone: 0.8, T10: 0.8, Hero: 0.8, Balanced: 0.9, VS: 1.2, PvP: 1.1 },
  Event:     { Drone: 1.0, T10: 1.0, Hero: 1.0, Balanced: 1.0, VS: 1.0, PvP: 1.0 },
  T10:       { Drone: 1.0, T10: 1.5, Hero: 0.8, Balanced: 1.1, VS: 1.0, PvP: 0.9 },
};

export const CURRENCY_PACKS: CurrencyPack[] = [
  { store: 'Black Market', pack_name: 'Daily Special Black Market Cash Pack', availability_type: 'Daily', eur: 5.99, currency: 'Black Market Cash', amount: 800, purchases_per_period: '1', notes: 'Best €/cash' },
  { store: 'Black Market', pack_name: 'Daily Premium Black Market Cash Pack', availability_type: 'Daily', eur: 11.99, currency: 'Black Market Cash', amount: 1000, purchases_per_period: '1', notes: 'Flat after starter' },
  { store: 'Black Market', pack_name: 'Daily Rare Black Market Cash Pack', availability_type: 'Daily', eur: 23.99, currency: 'Black Market Cash', amount: 2000, purchases_per_period: '1', notes: '' },
  { store: 'Black Market', pack_name: 'Daily Luxury Black Market Cash Pack', availability_type: 'Daily', eur: 59.99, currency: 'Black Market Cash', amount: 5000, purchases_per_period: '1', notes: '' },
  { store: 'Total Mobilization', pack_name: 'Daily Sale Pack', availability_type: 'Daily', eur: 5.99, currency: 'Mobilization Coupons', amount: 10, purchases_per_period: '1', notes: 'Flat scaling' },
  { store: 'Total Mobilization', pack_name: 'Daily Premium Pack', availability_type: 'Daily', eur: 11.99, currency: 'Mobilization Coupons', amount: 20, purchases_per_period: '1', notes: '' },
  { store: 'Total Mobilization', pack_name: 'Daily Rare Pack', availability_type: 'Daily', eur: 23.99, currency: 'Mobilization Coupons', amount: 40, purchases_per_period: '1', notes: '' },
  { store: 'Glittering Market', pack_name: 'Daily Mega Sale Glitter Coin Pack', availability_type: 'Daily', eur: 0, currency: 'Glittering Coins', amount: 60, purchases_per_period: '1', notes: 'Free daily pack' },
  { store: 'Glittering Market', pack_name: 'Daily Value Glitter Coin Pack', availability_type: 'Daily', eur: 5.99, currency: 'Glittering Coins', amount: 80, purchases_per_period: '1', notes: 'Best €/coin among paid' },
  { store: 'Glittering Market', pack_name: 'Daily Special Glitter Coin Pack', availability_type: 'Daily', eur: 11.99, currency: 'Glittering Coins', amount: 100, purchases_per_period: '10', notes: '' },
  { store: 'Bounty Hunter', pack_name: 'Wandering Merchant Small Pack', availability_type: 'Event', eur: 11.99, currency: 'Bounty Voucher', amount: 120, purchases_per_period: '999', notes: '' },
  { store: 'Bounty Hunter', pack_name: 'Wandering Merchant Large Pack', availability_type: 'Event', eur: 59.99, currency: 'Bounty Voucher', amount: 600, purchases_per_period: '999', notes: '' },
  { store: 'Bullseye Loot', pack_name: 'Daily Sale Ammo Pack', availability_type: 'Daily', eur: 5.99, currency: 'Ammo', amount: 10, purchases_per_period: '1', notes: 'Best €/ammo' },
];

function getFocusSpecificMultiplier(item: StoreItem, focus: Focus): number {
  // T10 progression is frequently gold-starved, so resource choice chests
  // should surface in the advisor instead of being treated like low-value filler.
  if (focus === 'T10' && item.item.includes('Resource Choice Chest')) {
    return 2;
  }

  return 1;
}

// Scoring engine
export function scoreItems(focus: Focus, _budget: string): ScoredItem[] {
  return STORE_ITEMS.map(item => {
    const catWeight = CATEGORY_WEIGHTS[item.category]?.[focus] ?? 1.0;
    const focusSpecificMultiplier = getFocusSpecificMultiplier(item, focus);
    const adjusted = item.base_value * catWeight * item.weight_multiplier * focusSpecificMultiplier;

    let decision: 'Buy' | 'Consider' | 'Skip';
    if (adjusted >= 16) decision = 'Buy';
    else if (adjusted >= 10) decision = 'Consider';
    else decision = 'Skip';

    // Build why string
    const reasons: string[] = [];
    if (item.notes && item.notes !== 'nan') reasons.push(item.notes);
    if (catWeight > 1.2) reasons.push(`Great for ${focus} focus`);
    else if (catWeight < 0.7) reasons.push(`Low priority for ${focus} focus`);
    if (focus === 'T10' && item.item.includes('Resource Choice Chest')) {
      reasons.push('Gold bottleneck support for T10 progression');
    }
    if (item.availability_type === 'Daily') reasons.push('Available daily');

    return {
      ...item,
      adjusted_score: Math.round(adjusted * 10) / 10,
      decision,
      why: reasons.join(' · ') || `Base value ${item.base_value}`,
    };
  }).sort((a, b) => b.adjusted_score - a.adjusted_score);
}

// Get best currency packs for a store
export function getBestPacks(store: string, budget: string): CurrencyPack[] {
  const maxEur = budget === 'free' ? 0 :
    budget === 'low' ? 5 :
    budget === 'medium' ? 20 :
    budget === 'high' ? 999 : 999;

  return CURRENCY_PACKS
    .filter(p => p.store === store && p.eur <= maxEur)
    .sort((a, b) => (b.amount / Math.max(b.eur, 0.01)) - (a.amount / Math.max(a.eur, 0.01)));
}
