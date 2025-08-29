import { datetime, int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { user } from "./auth.schema"
import { CategorySchema } from "./category.schema"

export const TaskSchema = mysqlTable("task", {
    id: int("id").autoincrement().primaryKey(),
    userId: varchar("user_id", { length: 36 })
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    categoryId: int("category_id")
        .notNull()
        .references(() => CategorySchema.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    expireDate: datetime("expire_date"),
    position: int("position").notNull(), // 100,200...
    createdAt: timestamp("created_at").defaultNow(),
})

export type ITask = typeof TaskSchema.$inferSelect
export type ICreateTask = typeof TaskSchema.$inferInsert
