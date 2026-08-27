CREATE TABLE `commander_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discord_id` text NOT NULL,
	`hq_level` integer DEFAULT 1 NOT NULL,
	`tech_center_level` integer DEFAULT 1 NOT NULL,
	`barracks_level` integer DEFAULT 1 NOT NULL,
	`research_speed` integer DEFAULT 0 NOT NULL,
	`construction_speed` integer DEFAULT 0 NOT NULL,
	`food` integer DEFAULT 0 NOT NULL,
	`iron` integer DEFAULT 0 NOT NULL,
	`gold` integer DEFAULT 0 NOT NULL,
	`valor` integer DEFAULT 0 NOT NULL,
	`tech_progress_json` text DEFAULT '{}' NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_commander_progress_discord` ON `commander_progress` (`discord_id`);