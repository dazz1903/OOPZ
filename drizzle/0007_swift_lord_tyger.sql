ALTER TABLE `commander_progress` ADD `vehicle_center` text DEFAULT 'Tank' NOT NULL;--> statement-breakpoint
ALTER TABLE `commander_progress` ADD `hero_profile_json` text DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE `commander_progress` ADD `drone_profile_json` text DEFAULT '{}' NOT NULL;