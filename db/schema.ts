import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const members = sqliteTable('members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  discordId: text('discord_id').notNull(),
  discordUsername: text('discord_username'),
  displayName: text('display_name'),
  playerName: text('player_name'),
  lwmaPlayerId: text('lwma_player_id'),
  role: text('role').notNull().default('member'),
  verificationStatus: text('verification_status').notNull().default('unlinked'),
  approvedBy: text('approved_by'),
  approvedAt: integer('approved_at', { mode: 'timestamp' }),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull(),
}, (table) => [uniqueIndex('idx_members_discord_id').on(table.discordId), uniqueIndex('idx_members_lwma_player_id').on(table.lwmaPlayerId), index('idx_members_active').on(table.active)]);

export const alliancePlayers = sqliteTable('alliance_players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  lwmaPlayerId: text('lwma_player_id').notNull(),
  playerName: text('player_name').notNull(),
  power: integer('power').notNull().default(0),
  level: integer('level'),
  allianceRank: text('alliance_rank'),
  kills: integer('kills'),
  todayDonations: integer('today_donations'),
  weeklyDonations: integer('weekly_donations'),
  source: text('source').notNull().default('lwma'),
  capturedAt: integer('captured_at', { mode: 'timestamp' }).notNull(),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
}, (table) => [uniqueIndex('idx_alliance_players_lwma_id').on(table.lwmaPlayerId), index('idx_alliance_players_power').on(table.power), index('idx_alliance_players_active').on(table.active)]);

export const identityClaims = sqliteTable('identity_claims', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  discordId: text('discord_id').notNull(),
  lwmaPlayerId: text('lwma_player_id').notNull(),
  status: text('status').notNull().default('pending'),
  requestedAt: integer('requested_at', { mode: 'timestamp' }).notNull(),
  decidedAt: integer('decided_at', { mode: 'timestamp' }),
  decidedBy: text('decided_by'),
}, (table) => [uniqueIndex('idx_claims_discord_id').on(table.discordId), index('idx_claims_status').on(table.status), index('idx_claims_player').on(table.lwmaPlayerId)]);

export const ingestionRuns = sqliteTable('ingestion_runs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  source: text('source').notNull(),
  recordCount: integer('record_count').notNull(),
  importedBy: text('imported_by').notNull(),
  importedAt: integer('imported_at', { mode: 'timestamp' }).notNull(),
}, (table) => [index('idx_ingestion_runs_date').on(table.importedAt)]);

export const playerSnapshots = sqliteTable('player_snapshots', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memberId: integer('member_id').notNull().references(() => members.id),
  capturedAt: integer('captured_at', { mode: 'timestamp' }).notNull(),
  accountPower: integer('account_power').notNull(),
  strongestMarch: integer('strongest_march'),
  vsContribution: integer('vs_contribution'),
  payloadJson: text('payload_json').notNull().default('{}'),
}, (table) => [uniqueIndex('idx_snapshots_member_date').on(table.memberId, table.capturedAt), index('idx_snapshots_date').on(table.capturedAt)]);

export const roadmapItems = sqliteTable('roadmap_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  owner: text('owner').notNull(),
  progress: integer('progress').notNull().default(0),
  dueLabel: text('due_label').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
}, (table) => [index('idx_roadmap_active_order').on(table.active, table.sortOrder)]);

export const guides = sqliteTable('guides', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull(),
  category: text('category').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  body: text('body').notNull(),
  publishedAt: integer('published_at', { mode: 'timestamp' }),
}, (table) => [uniqueIndex('idx_guides_slug').on(table.slug), index('idx_guides_category').on(table.category)]);

export const battleReports = sqliteTable('battle_reports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memberId: integer('member_id').notNull().references(() => members.id),
  objectKey: text('object_key').notNull(),
  status: text('status').notNull().default('uploaded'),
  analysis: text('analysis'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, (table) => [index('idx_reports_member_date').on(table.memberId, table.createdAt)]);

export const battleAnalysisUsage = sqliteTable('battle_analysis_usage', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  memberId: integer('member_id').notNull().references(() => members.id),
  weekKey: text('week_key').notNull(),
  status: text('status').notNull().default('processing'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, (table) => [uniqueIndex('idx_battle_usage_member_week').on(table.memberId, table.weekKey)]);
