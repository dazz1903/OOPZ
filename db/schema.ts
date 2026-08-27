import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const members = sqliteTable('members', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  discordId: text('discord_id').notNull(),
  playerName: text('player_name').notNull(),
  role: text('role').notNull().default('member'),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull(),
}, (table) => [uniqueIndex('idx_members_discord_id').on(table.discordId), index('idx_members_active').on(table.active)]);

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
