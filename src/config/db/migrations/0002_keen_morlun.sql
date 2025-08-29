CREATE TABLE `task_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`task_id` int NOT NULL,
	`from_category_id` int,
	`to_category_id` int,
	`action` enum('created','moved','modified') NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `task_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`category_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`expire_date` datetime,
	`position` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `task_history` ADD CONSTRAINT `task_history_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE cascade ON UPDATE cascade;