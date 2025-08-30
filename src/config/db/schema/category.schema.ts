import { relations } from "drizzle-orm"
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"
import { user } from "./auth.schema"
import { TaskSchema } from "./task.schema"

//  backlog, todo, in progress, done etc
export const CategorySchema = mysqlTable("category", {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 100 }).notNull(), // "To Do", "In Progress"
    createdAt: timestamp("created_at").defaultNow(),
    userId: varchar("user_id", { length: 36 })
        .notNull()
        .references(() => user.id, {
            onDelete: "cascade",
            onUpdate: "cascade",
        }),
})

export const CategoryRelations = relations(CategorySchema, ({ many, one }) => ({
    tasks: many(TaskSchema),
    user: one(user, {
        fields: [CategorySchema.userId],
        references: [user.id],
    }),
}))

export type ICategory = typeof CategorySchema.$inferSelect
export type ICreateCategory = typeof CategorySchema.$inferInsert
