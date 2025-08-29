import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"

//  backlog, todo, in progress, done etc
export const CategorySchema = mysqlTable("category", {
    id: int("id").autoincrement().primaryKey(),
    title: varchar("title", { length: 100 }).notNull(), // "To Do", "In Progress"
    createdAt: timestamp("created_at").defaultNow(),
})
export type ICategory = typeof CategorySchema.$inferSelect
export type ICreateCategory = typeof CategorySchema.$inferInsert
