import { int, mysqlEnum, mysqlTable, timestamp } from "drizzle-orm/mysql-core"
import { TaskSchema } from "./task.schema"

export const TaskHistorySchema = mysqlTable("task_history", {
    id: int("id").autoincrement().primaryKey(),
    taskId: int("task_id")
        .notNull()
        .references(() => TaskSchema.id),
    fromCategoryId: int("from_category_id"),
    toCategoryId: int("to_category_id"),
    action: mysqlEnum("action", ["created", "moved", "modified"]).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})
