ALTER TABLE `commander_progress` ADD `tech_center_count` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `commander_progress` ADD `worker_count` integer DEFAULT 2 NOT NULL;--> statement-breakpoint
ALTER TABLE `commander_progress` ADD `building_levels_json` text DEFAULT '{}' NOT NULL;