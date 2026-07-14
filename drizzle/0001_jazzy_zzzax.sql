CREATE TABLE `properties` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`price` text NOT NULL,
	`property_type` text NOT NULL,
	`beds` text NOT NULL,
	`baths` text NOT NULL,
	`sqft` text NOT NULL,
	`description` text NOT NULL,
	`features` text DEFAULT '[]' NOT NULL,
	`published` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `properties_slug_unique` ON `properties` (`slug`);--> statement-breakpoint
CREATE TABLE `property_media` (
	`id` text PRIMARY KEY NOT NULL,
	`property_id` text NOT NULL,
	`created_at` text NOT NULL,
	`kind` text NOT NULL,
	`url` text NOT NULL,
	`storage_key` text NOT NULL,
	`alt_text` text NOT NULL,
	`room_tag` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON UPDATE no action ON DELETE cascade
);
