CREATE TABLE `alliance_player_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lwma_player_id` text NOT NULL,
	`capture_date` text NOT NULL,
	`power` integer DEFAULT 0 NOT NULL,
	`level` integer,
	`alliance_rank` text,
	`kills` integer,
	`today_donations` integer,
	`weekly_donations` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_alliance_history_player_date` ON `alliance_player_history` (`lwma_player_id`,`capture_date`);--> statement-breakpoint
CREATE INDEX `idx_alliance_history_date` ON `alliance_player_history` (`capture_date`);