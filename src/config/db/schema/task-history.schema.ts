import { relations } from "drizzle-orm"
import { int, mysqlEnum, mysqlTable, timestamp } from "drizzle-orm/mysql-core"
import { TaskSchema } from "./task.schema"

export const TaskHistorySchema = mysqlTable("task_history", {
    id: int("id").autoincrement().primaryKey(),
    taskId: int("task_id")
        .notNull()
        .references(() => TaskSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    fromCategoryId: int("from_category_id"),
    toCategoryId: int("to_category_id"),
    action: mysqlEnum("action", ["created", "moved", "modified"]).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})

export const TaskHistoryRelations = relations(TaskHistorySchema, ({ one }) => ({
    task: one(TaskSchema, {
        fields: [TaskHistorySchema.taskId],
        references: [TaskSchema.id],
    }),
}))

export type ITaskHistory = typeof TaskHistorySchema.$inferSelect
export type ICreateTaskHistory = typeof TaskHistorySchema.$inferInsert
