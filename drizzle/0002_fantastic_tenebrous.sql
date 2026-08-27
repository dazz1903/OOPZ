CREATE TABLE `battle_analysis_usage` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`member_id` integer NOT NULL,
	`week_key` text NOT NULL,
	`status` text DEFAULT 'processing' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_battle_usage_member_week` ON `battle_analysis_usage` (`member_id`,`week_key`);