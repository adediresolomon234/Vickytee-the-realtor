CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`interest` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`caption` text,
	`url` text NOT NULL,
	`poster_url` text,
	`storage_key` text,
	`published` integer DEFAULT 1 NOT NULL
);
