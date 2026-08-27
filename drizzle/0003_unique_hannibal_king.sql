CREATE TABLE `vs_scores` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`week_start` text NOT NULL,
	`player_name` text NOT NULL,
	`points` integer DEFAULT 0 NOT NULL,
	`rank` integer NOT NULL,
	`captured_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vs_scores_week_player` ON `vs_scores` (`week_start`,`player_name`);--> statement-breakpoint
CREATE INDEX `idx_vs_scores_week_rank` ON `vs_scores` (`week_start`,`rank`);