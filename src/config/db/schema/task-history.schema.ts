import { relations } from "drizzle-orm"
import { int, mysqlEnum, mysqlTable, timestamp } from "drizzle-orm/mysql-core"
import { CategorySchema } from "./category.schema"
import { TaskSchema } from "./task.schema"

export const TaskHistorySchema = mysqlTable("task_history", {
    id: int("id").autoincrement().primaryKey(),
    taskId: int("task_id")
        .notNull()
        .references(() => TaskSchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    fromCategoryId: int("from_category_id").references(() => CategorySchema.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    toCategoryId: int("to_category_id").references(() => CategorySchema.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
    action: mysqlEnum("action", ["created", "moved", "modified"]).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})

export const TaskHistoryRelations = relations(TaskHistorySchema, ({ one }) => ({
    task: one(TaskSchema, {
        fields: [TaskHistorySchema.taskId],
        references: [TaskSchema.id],
    }),
    fromCategory: one(CategorySchema, {
        fields: [TaskHistorySchema.fromCategoryId],
        references: [CategorySchema.id],
    }),
    toCategory: one(CategorySchema, {
        fields: [TaskHistorySchema.toCategoryId],
        references: [CategorySchema.id],
    }),
}))

export type ITaskHistory = typeof TaskHistorySchema.$inferSelect
export type ICreateTaskHistory = typeof TaskHistorySchema.$inferInsert
