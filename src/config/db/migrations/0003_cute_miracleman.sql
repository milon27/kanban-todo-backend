ALTER TABLE `task_history` DROP FOREIGN KEY `task_history_task_id_task_id_fk`;
--> statement-breakpoint
ALTER TABLE `task_history` ADD CONSTRAINT `task_history_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE cascade ON UPDATE cascade;