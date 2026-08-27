CREATE TABLE `alliance_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lwma_player_id` text NOT NULL,
	`player_name` text NOT NULL,
	`power` integer DEFAULT 0 NOT NULL,
	`level` integer,
	`alliance_rank` text,
	`kills` integer,
	`today_donations` integer,
	`weekly_donations` integer,
	`source` text DEFAULT 'lwma' NOT NULL,
	`captured_at` integer NOT NULL,
	`active` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_alliance_players_lwma_id` ON `alliance_players` (`lwma_player_id`);--> statement-breakpoint
CREATE INDEX `idx_alliance_players_power` ON `alliance_players` (`power`);--> statement-breakpoint
CREATE INDEX `idx_alliance_players_active` ON `alliance_players` (`active`);--> statement-breakpoint
CREATE TABLE `identity_claims` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discord_id` text NOT NULL,
	`lwma_player_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`requested_at` integer NOT NULL,
	`decided_at` integer,
	`decided_by` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_claims_discord_id` ON `identity_claims` (`discord_id`);--> statement-breakpoint
CREATE INDEX `idx_claims_status` ON `identity_claims` (`status`);--> statement-breakpoint
CREATE INDEX `idx_claims_player` ON `identity_claims` (`lwma_player_id`);--> statement-breakpoint
CREATE TABLE `ingestion_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source` text NOT NULL,
	`record_count` integer NOT NULL,
	`imported_by` text NOT NULL,
	`imported_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_ingestion_runs_date` ON `ingestion_runs` (`imported_at`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discord_id` text NOT NULL,
	`discord_username` text,
	`display_name` text,
	`player_name` text,
	`lwma_player_id` text,
	`role` text DEFAULT 'member' NOT NULL,
	`verification_status` text DEFAULT 'unlinked' NOT NULL,
	`approved_by` text,
	`approved_at` integer,
	`active` integer DEFAULT true NOT NULL,
	`joined_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_members`("id", "discord_id", "player_name", "role", "verification_status", "active", "joined_at") SELECT "id", "discord_id", "player_name", "role", CASE WHEN "player_name" IS NOT NULL AND "player_name" <> '' THEN 'pending' ELSE 'unlinked' END, "active", "joined_at" FROM `members`;--> statement-breakpoint
DROP TABLE `members`;--> statement-breakpoint
ALTER TABLE `__new_members` RENAME TO `members`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_members_discord_id` ON `members` (`discord_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_members_lwma_player_id` ON `members` (`lwma_player_id`);--> statement-breakpoint
CREATE INDEX `idx_members_active` ON `members` (`active`);
