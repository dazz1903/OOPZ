/**
 * Building upgrade costs for T10 prerequisite buildings.
 * Source: in-game data provided by user.
 *
 * Format: [level, food, gold, iron, oil, timeHours]
 * Oil is 0 for pre-Age of Oil levels.
 * HQ starts from level 28 (when players begin planning for T10 via T9 at HQ 27).
 * Tech Center and Barracks include full range for completeness.
 */

export interface BuildingLevelCost {
  level: number;
  food: number;
  gold: number;
  iron: number;
  oil: number;
  timeHours: number;
}

// ── Helper to parse time strings like "01d 09:22:37" → hours ─────────────
function parseTime(s: string): number {
  const dayMatch = s.match(/(\d+)d\s+(\d+):(\d+):(\d+)/);
  if (dayMatch) {
    return parseInt(dayMatch[1]) * 24 + parseInt(dayMatch[2]) + parseInt(dayMatch[3]) / 60 + parseInt(dayMatch[4]) / 3600;
  }
  const timeMatch = s.match(/(\d+):(\d+):(\d+)/);
  if (timeMatch) {
    return parseInt(timeMatch[1]) + parseInt(timeMatch[2]) / 60 + parseInt(timeMatch[3]) / 3600;
  }
  return 0;
}

function M(n: number) { return n * 1_000_000; }
function G(n: number) { return n * 1_000_000_000; }
function K(n: number) { return n * 1_000; }

// ── HQ Upgrade Costs (from level 28 onwards) ──────────────────────────────
// Players planning for T10 start here (T9 unlocks at HQ 27)
export const HQ_UPGRADE_COSTS: BuildingLevelCost[] = [
  { level: 28, food: M(740),  gold: M(240),  iron: M(740),  oil: 0,         timeHours: parseTime('60d 02:54:20') },
  { level: 29, food: M(1000), gold: M(330),  iron: M(1000), oil: 0,         timeHours: parseTime('78d 03:46:37') },
  { level: 30, food: M(1400), gold: M(460),  iron: M(1400), oil: 0,         timeHours: parseTime('101d 14:30:37') },
  { level: 31, food: M(1600), gold: M(510),  iron: M(1600), oil: M(1.44),   timeHours: parseTime('111d 18:21:40') },
  { level: 32, food: M(1700), gold: M(560),  iron: M(1700), oil: M(2.30),   timeHours: parseTime('122d 22:35:50') },
  { level: 33, food: M(1900), gold: M(620),  iron: M(1900), oil: M(3.92),   timeHours: parseTime('135d 05:39:25') },
  { level: 34, food: M(2000), gold: M(650),  iron: M(2000), oil: M(7.05),   timeHours: parseTime('141d 23:56:23') },
  { level: 35, food: M(2100), gold: M(680),  iron: M(2100), oil: M(14.10),  timeHours: parseTime('149d 02:20:13') },
];

// ── Tech Center Upgrade Costs (full range) ────────────────────────────────
export const TECH_CENTER_UPGRADE_COSTS: BuildingLevelCost[] = [
  { level: 1,  food: 900,      gold: 0,        iron: 900,      oil: 0, timeHours: parseTime('00:00:06') },
  { level: 2,  food: K(2.3),   gold: K(2.3),   iron: 0,        oil: 0, timeHours: parseTime('00:00:12') },
  { level: 3,  food: K(1),     gold: 0,         iron: K(1),    oil: 0, timeHours: parseTime('00:00:47') },
  { level: 4,  food: K(2.5),   gold: 0,         iron: K(2.5),  oil: 0, timeHours: parseTime('00:01:57') },
  { level: 5,  food: K(20),    gold: 0,         iron: K(20),   oil: 0, timeHours: parseTime('00:11:42') },
  { level: 6,  food: K(91),    gold: 0,         iron: K(91),   oil: 0, timeHours: parseTime('00:35:06') },
  { level: 7,  food: K(210),   gold: 0,         iron: K(210),  oil: 0, timeHours: parseTime('01:21:54') },
  { level: 8,  food: K(340),   gold: 0,         iron: K(340),  oil: 0, timeHours: parseTime('02:43:48') },
  { level: 9,  food: K(540),   gold: K(170),    iron: K(540),  oil: 0, timeHours: parseTime('03:49:20') },
  { level: 10, food: K(650),   gold: K(210),    iron: K(650),  oil: 0, timeHours: parseTime('04:58:07') },
  { level: 11, food: M(1.6),   gold: M(0.52),   iron: M(1.6),  oil: 0, timeHours: parseTime('06:27:34') },
  { level: 12, food: M(2.8),   gold: M(0.89),   iron: M(2.8),  oil: 0, timeHours: parseTime('08:23:49') },
  { level: 13, food: M(3.1),   gold: M(0.98),   iron: M(3.1),  oil: 0, timeHours: parseTime('10:54:58') },
  { level: 14, food: M(4.3),   gold: M(1.4),    iron: M(4.3),  oil: 0, timeHours: parseTime('14:11:27') },
  { level: 15, food: M(6),     gold: M(1.9),    iron: M(6),    oil: 0, timeHours: parseTime('19:52:02') },
  { level: 16, food: M(11),    gold: M(3.4),    iron: M(11),   oil: 0, timeHours: parseTime('1d 03:48:51') },
  { level: 17, food: M(14),    gold: M(4.4),    iron: M(14),   oil: 0, timeHours: parseTime('1d 14:56:23') },
  { level: 18, food: M(24),    gold: M(7.8),    iron: M(24),   oil: 0, timeHours: parseTime('2d 06:30:56') },
  { level: 19, food: M(29),    gold: M(9.3),    iron: M(29),   oil: 0, timeHours: parseTime('3d 04:19:18') },
  { level: 20, food: M(52),    gold: M(17),     iron: M(52),   oil: 0, timeHours: parseTime('4d 10:51:02') },
  { level: 21, food: M(73),    gold: M(23),     iron: M(73),   oil: 0, timeHours: parseTime('5d 19:01:00') },
  { level: 22, food: M(95),    gold: M(30),     iron: M(95),   oil: 0, timeHours: parseTime('7d 12:41:18') },
  { level: 23, food: M(120),   gold: M(38),     iron: M(120),  oil: 0, timeHours: parseTime('9d 18:45:01') },
  { level: 24, food: M(150),   gold: M(48),     iron: M(150),  oil: 0, timeHours: parseTime('13d 16:52:21') },
  { level: 25, food: M(250),   gold: M(81),     iron: M(250),  oil: 0, timeHours: parseTime('19d 04:06:37') },
  { level: 26, food: M(350),   gold: M(110),    iron: M(350),  oil: 0, timeHours: parseTime('26d 20:42:36') },
  { level: 27, food: M(460),   gold: M(150),    iron: M(460),  oil: 0, timeHours: parseTime('37d 13:35:38') },
  { level: 28, food: M(640),   gold: M(210),    iron: M(640),  oil: 0, timeHours: parseTime('52d 14:19:12') },
  { level: 29, food: M(900),   gold: M(290),    iron: M(900),  oil: 0, timeHours: parseTime('68d 11:24:58') },
  { level: 30, food: G(1.3),   gold: M(400),    iron: G(1.3),  oil: 0, timeHours: parseTime('88d 23:35:07') },
  { level: 31, food: G(1.4),   gold: M(440),    iron: G(1.4),  oil: M(0.81), timeHours: parseTime('97d 20:30:38') },
  { level: 32, food: G(1.5),   gold: M(490),    iron: G(1.5),  oil: M(1.3),  timeHours: parseTime('107d 13:46:21') },
  { level: 33, food: G(1.7),   gold: M(540),    iron: G(1.7),  oil: M(2.2),  timeHours: parseTime('118d 07:57:00') },
  { level: 34, food: G(1.8),   gold: M(570),    iron: G(1.8),  oil: M(3.97), timeHours: parseTime('124d 05:10:11') },
  { level: 35, food: G(1.9),   gold: M(590),    iron: G(1.9),  oil: M(7.93), timeHours: parseTime('130d 11:02:41') },
];

// ── Barracks Upgrade Costs (full range) ───────────────────────────────────
export const BARRACKS_UPGRADE_COSTS: BuildingLevelCost[] = [
  { level: 1,  food: 400,     gold: 400,     iron: 0,        oil: 0, timeHours: parseTime('00:00:03') },
  { level: 2,  food: 300,     gold: 300,     iron: 0,        oil: 0, timeHours: parseTime('00:00:04') },
  { level: 3,  food: K(2.1),  gold: 680,     iron: 0,        oil: 0, timeHours: parseTime('00:00:47') },
  { level: 4,  food: K(1.7),  gold: 0,       iron: K(1.7),   oil: 0, timeHours: parseTime('00:01:57') },
  { level: 5,  food: K(14),   gold: 0,       iron: K(14),    oil: 0, timeHours: parseTime('00:11:42') },
  { level: 6,  food: K(61),   gold: 0,       iron: K(61),    oil: 0, timeHours: parseTime('00:35:06') },
  { level: 7,  food: K(120),  gold: 0,       iron: K(120),   oil: 0, timeHours: parseTime('01:10:12') },
  { level: 8,  food: K(190),  gold: 0,       iron: K(190),   oil: 0, timeHours: parseTime('02:20:24') },
  { level: 9,  food: K(310),  gold: K(120),  iron: K(310),   oil: 0, timeHours: parseTime('03:16:34') },
  { level: 10, food: K(370),  gold: K(150),  iron: K(370),   oil: 0, timeHours: parseTime('04:15:32') },
  { level: 11, food: K(930),  gold: K(370),  iron: K(930),   oil: 0, timeHours: parseTime('05:32:12') },
  { level: 12, food: M(1.6),  gold: M(0.63), iron: M(1.6),   oil: 0, timeHours: parseTime('07:11:51') },
  { level: 13, food: M(1.7),  gold: M(0.70), iron: M(1.7),   oil: 0, timeHours: parseTime('09:21:24') },
  { level: 14, food: M(2.4),  gold: M(0.98), iron: M(2.4),   oil: 0, timeHours: parseTime('12:09:49') },
  { level: 15, food: M(3.4),  gold: M(1.4),  iron: M(3.4),   oil: 0, timeHours: parseTime('17:01:45') },
  { level: 16, food: M(6.1),  gold: M(2.4),  iron: M(6.1),   oil: 0, timeHours: parseTime('23:50:27') },
  { level: 17, food: M(7.9),  gold: M(3.2),  iron: M(7.9),   oil: 0, timeHours: parseTime('1d 09:22:37') },
  { level: 18, food: M(14),   gold: M(5.5),  iron: M(14),    oil: 0, timeHours: parseTime('1d 22:43:40') },
  { level: 19, food: M(17),   gold: M(6.6),  iron: M(17),    oil: 0, timeHours: parseTime('2d 17:25:07') },
  { level: 20, food: M(30),   gold: M(12),   iron: M(30),    oil: 0, timeHours: parseTime('3d 19:35:10') },
  { level: 21, food: M(42),   gold: M(17),   iron: M(42),    oil: 0, timeHours: parseTime('4d 23:03:43') },
  { level: 22, food: M(54),   gold: M(22),   iron: M(54),    oil: 0, timeHours: parseTime('6d 10:46:49') },
  { level: 23, food: M(68),   gold: M(27),   iron: M(68),    oil: 0, timeHours: parseTime('8d 09:12:52') },
  { level: 24, food: M(85),   gold: M(34),   iron: M(85),    oil: 0, timeHours: parseTime('11d 17:42:01') },
  { level: 25, food: M(140),  gold: M(58),   iron: M(140),   oil: 0, timeHours: parseTime('16d 10:22:49') },
  { level: 26, food: M(200),  gold: M(81),   iron: M(200),   oil: 0, timeHours: parseTime('23d 01:47:56') },
  { level: 27, food: M(260),  gold: M(110),  iron: M(260),   oil: 0, timeHours: parseTime('32d 05:25:47') },
  { level: 28, food: M(370),  gold: M(150),  iron: M(370),   oil: 0, timeHours: parseTime('45d 02:10:45') },
  { level: 29, food: M(520),  gold: M(210),  iron: M(520),   oil: 0, timeHours: parseTime('58d 14:49:58') },
  { level: 30, food: M(720),  gold: M(290),  iron: M(720),   oil: 0, timeHours: parseTime('76d 05:39:38') },
  { level: 31, food: M(790),  gold: M(320),  iron: M(790),   oil: M(0.36),  timeHours: parseTime('83d 19:46:15') },
  { level: 32, food: M(870),  gold: M(350),  iron: M(870),   oil: M(0.576), timeHours: parseTime('92d 04:56:53') },
  { level: 33, food: M(960),  gold: M(380),  iron: M(960),   oil: M(0.979), timeHours: parseTime('101d 10:14:34') },
  { level: 34, food: G(1),    gold: M(400),  iron: G(1),     oil: M(1.76),  timeHours: parseTime('106d 11:57:18') },
  { level: 35, food: G(1.1),  gold: M(420),  iron: G(1.1),   oil: M(3.53),  timeHours: parseTime('111d 19:45:10') },
];

// ── Cost calculator ───────────────────────────────────────────────────────
export interface UpgradeCostRange {
  food: number;
  gold: number;
  iron: number;
  oil: number;
  timeHours: number;
  levelsNeeded: number;
}

export function calcBuildingUpgradeCost(
  building: 'HQ' | 'Tech Center' | 'Barracks',
  fromLevel: number,
  toLevel: number,
): UpgradeCostRange {
  const table =
    building === 'HQ' ? HQ_UPGRADE_COSTS :
    building === 'Tech Center' ? TECH_CENTER_UPGRADE_COSTS :
    BARRACKS_UPGRADE_COSTS;

  const result: UpgradeCostRange = { food: 0, gold: 0, iron: 0, oil: 0, timeHours: 0, levelsNeeded: 0 };

  for (const row of table) {
    // row.level is the level you're upgrading TO
    if (row.level > fromLevel && row.level <= toLevel) {
      result.food      += row.food;
      result.gold      += row.gold;
      result.iron      += row.iron;
      result.oil       += row.oil;
      result.timeHours += row.timeHours;
      result.levelsNeeded++;
    }
  }

  return result;
}

// ── Combined T10 prerequisites cost (all three buildings + note) ──────────
export interface T10PrereqCosts {
  hq: UpgradeCostRange;
  techCenter: UpgradeCostRange;
  barracks: UpgradeCostRange;
  combined: UpgradeCostRange;
}

export function calcT10PrereqCosts(
  hqLevel: number,
  techCenterLevel: number,
  barracksLevel: number,
): T10PrereqCosts {
  const hq         = calcBuildingUpgradeCost('HQ',          hqLevel,          30);
  const techCenter = calcBuildingUpgradeCost('Tech Center', techCenterLevel,  30);
  const barracks   = calcBuildingUpgradeCost('Barracks',    barracksLevel,    30);

  const combined: UpgradeCostRange = {
    food:         hq.food         + techCenter.food         + barracks.food,
    gold:         hq.gold         + techCenter.gold         + barracks.gold,
    iron:         hq.iron         + techCenter.iron         + barracks.iron,
    oil:          hq.oil          + techCenter.oil          + barracks.oil,
    timeHours:    hq.timeHours    + techCenter.timeHours    + barracks.timeHours,
    levelsNeeded: hq.levelsNeeded + techCenter.levelsNeeded + barracks.levelsNeeded,
  };

  return { hq, techCenter, barracks, combined };
}
