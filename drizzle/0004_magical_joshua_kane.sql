CREATE TABLE `arena_rankings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`capture_date` text NOT NULL,
	`player_name` text NOT NULL,
	`score` integer NOT NULL,
	`squad_power` integer NOT NULL,
	`server_rank` integer NOT NULL,
	`captured_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_arena_date_player` ON `arena_rankings` (`capture_date`,`player_name`);--> statement-breakpoint
CREATE INDEX `idx_arena_date_rank` ON `arena_rankings` (`capture_date`,`server_rank`);--> statement-breakpoint
CREATE TABLE `hero_power_rankings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`capture_date` text NOT NULL,
	`player_name` text NOT NULL,
	`hero_power` integer NOT NULL,
	`server_rank` integer NOT NULL,
	`captured_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_hero_power_date_player` ON `hero_power_rankings` (`capture_date`,`player_name`);--> statement-breakpoint
CREATE INDEX `idx_hero_power_date_rank` ON `hero_power_rankings` (`capture_date`,`server_rank`);--> statement-breakpoint
ALTER TABLE `vs_scores` ADD `mon_points` integer;--> statement-breakpoint
ALTER TABLE `vs_scores` ADD `tue_points` integer;--> statement-breakpoint
ALTER TABLE `vs_scores` ADD `wed_points` integer;--> statement-breakpoint
ALTER TABLE `vs_scores` ADD `thu_points` integer;--> statement-breakpoint
ALTER TABLE `vs_scores` ADD `fri_points` integer;--> statement-breakpoint
ALTER TABLE `vs_scores` ADD `sat_points` integer;