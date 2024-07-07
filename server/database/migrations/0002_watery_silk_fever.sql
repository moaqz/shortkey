CREATE TABLE `links` (
	`id` integer PRIMARY KEY NOT NULL,
	`destination_url` text NOT NULL,
	`slug` text NOT NULL,
	`user_id` text NOT NULL,
	`total_clicks` integer DEFAULT 0 NOT NULL,
	`last_clicked` integer,
	`created_at` integer DEFAULT unixepoch() NOT NULL,
	`updated_at` integer DEFAULT unixepoch() NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `links_slug_unique` ON `links` (`slug`);