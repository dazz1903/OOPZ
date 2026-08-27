CREATE TABLE `battle_reports` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`member_id` integer NOT NULL,
	`object_key` text NOT NULL,
	`status` text DEFAULT 'uploaded' NOT NULL,
	`analysis` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_reports_member_date` ON `battle_reports` (`member_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `guides` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`body` text NOT NULL,
	`published_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_guides_slug` ON `guides` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_guides_category` ON `guides` (`category`);--> statement-breakpoint
CREATE TABLE `members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`discord_id` text NOT NULL,
	`player_name` text NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`joined_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_members_discord_id` ON `members` (`discord_id`);--> statement-breakpoint
CREATE INDEX `idx_members_active` ON `members` (`active`);--> statement-breakpoint
CREATE TABLE `player_snapshots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`member_id` integer NOT NULL,
	`captured_at` integer NOT NULL,
	`account_power` integer NOT NULL,
	`strongest_march` integer,
	`vs_contribution` integer,
	`payload_json` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_snapshots_member_date` ON `player_snapshots` (`member_id`,`captured_at`);--> statement-breakpoint
CREATE INDEX `idx_snapshots_date` ON `player_snapshots` (`captured_at`);--> statement-breakpoint
CREATE TABLE `roadmap_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`owner` text NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`due_label` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_roadmap_active_order` ON `roadmap_items` (`active`,`sort_order`);