import { and, asc, desc, eq, gt, gte, lt, lte, not, sql } from "drizzle-orm"
import { db } from "../../config/db/db.config"
import { ICreateTask, TaskHistorySchema, TaskSchema } from "../../config/db/schema"
import { ICreateTaskDto, IMoveTaskDto, IUpdateTaskDto } from "./dto/task.dto"

export const TaskService = {
    getAll: async (userId: string) => {
        const tasks = await db.query.TaskSchema.findMany({
            where: eq(TaskSchema.userId, userId),
            with: {
                category: true,
            },
            orderBy: [asc(TaskSchema.position)],
        })
        return tasks
    },

    getById: async (id: number, userId: string) => {
        const task = await db.query.TaskSchema.findFirst({
            where: and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)),
            with: {
                category: true,
                history: {
                    orderBy: [desc(TaskHistorySchema.createdAt)],
                },
            },
        })
        return task
    },

    create: async (dto: ICreateTaskDto, userId: string) => {
        await db.transaction(async (tx) => {
            const [task] = await db.insert(TaskSchema).values({
                title: dto.title,
                description: dto.description,
                categoryId: dto.categoryId,
                expireDate: dto.expireDate ? new Date(dto.expireDate) : undefined,
                position: dto.position,
                userId,
            })

            // Create task history for creation
            await db.insert(TaskHistorySchema).values({
                taskId: task.insertId,
                toCategoryId: dto.categoryId,
                action: "created",
            })
        })
    },

    update: async (id: number, dto: IUpdateTaskDto, userId: string) => {
        const updateData: Partial<ICreateTask> = {}

        if (dto.title !== undefined) updateData.title = dto.title
        if (dto.description !== undefined) updateData.description = dto.description
        if (dto.expireDate !== undefined) updateData.expireDate = dto.expireDate ? new Date(dto.expireDate) : null
        if (dto.position !== undefined) updateData.position = dto.position

        await db.transaction(async (tx) => {
            // Update task position and category
            await db
                .update(TaskSchema)
                .set(updateData)
                .where(and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)))

            // Create task history for the update
            await tx.insert(TaskHistorySchema).values({
                taskId: id,
                action: "modified",
            })
        })
    },

    move: async (id: number, dto: IMoveTaskDto, userId: string) => {
        // console.log(JSON.stringify(dto, null, 2))
        // Get current task that we want to move
        const currentTask = await db.query.TaskSchema.findFirst({
            where: and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)),
        })

        if (!currentTask) {
            throw new Error("Task not found")
        }

        // If same category and same position, no operation needed
        if (currentTask.categoryId === dto.categoryId && currentTask.position === dto.position) {
            return
        }

        await db.transaction(async (tx) => {
            // If moving within the same category
            if (currentTask.categoryId === dto.categoryId) {
                // Moving to a higher position (moving down in the list)
                if (dto.position > currentTask.position) {
                    // Decrease positions of tasks between current position and new position
                    await tx
                        .update(TaskSchema)
                        .set({
                            position: sql`${TaskSchema.position} - 1`,
                        })
                        .where(
                            and(
                                gt(TaskSchema.position, currentTask.position),
                                lte(TaskSchema.position, dto.position),
                                eq(TaskSchema.categoryId, dto.categoryId),
                                eq(TaskSchema.userId, userId),
                                not(eq(TaskSchema.id, id))
                            )
                        )
                } else {
                    // Moving to a lower position (moving up in the list)
                    // Increase positions of tasks between new position and current position
                    await tx
                        .update(TaskSchema)
                        .set({
                            position: sql`${TaskSchema.position} + 1`,
                        })
                        .where(
                            and(
                                gte(TaskSchema.position, dto.position),
                                lt(TaskSchema.position, currentTask.position),
                                eq(TaskSchema.categoryId, dto.categoryId),
                                eq(TaskSchema.userId, userId),
                                not(eq(TaskSchema.id, id))
                            )
                        )
                }
            } else {
                // Moving to a different category

                // In the source category: decrease positions of tasks after the current position
                await tx
                    .update(TaskSchema)
                    .set({
                        position: sql`${TaskSchema.position} - 1`,
                    })
                    .where(
                        and(
                            gt(TaskSchema.position, currentTask.position),
                            eq(TaskSchema.categoryId, currentTask.categoryId),
                            eq(TaskSchema.userId, userId),
                            not(eq(TaskSchema.id, id))
                        )
                    )

                // In the destination category: increase positions of tasks at and after the new position
                await tx
                    .update(TaskSchema)
                    .set({
                        position: sql`${TaskSchema.position} + 1`,
                    })
                    .where(
                        and(
                            gte(TaskSchema.position, dto.position),
                            eq(TaskSchema.categoryId, dto.categoryId),
                            eq(TaskSchema.userId, userId),
                            not(eq(TaskSchema.id, id))
                        )
                    )
            }

            // Update the moved task with new position and category
            await tx
                .update(TaskSchema)
                .set({
                    categoryId: dto.categoryId,
                    position: dto.position,
                })
                .where(and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)))

            // Create task history for the move
            await tx.insert(TaskHistorySchema).values({
                taskId: id,
                fromCategoryId: currentTask.categoryId,
                toCategoryId: dto.categoryId,
                action: "moved",
            })
        })
    },

    delete: async (id: number, userId: string) => {
        await db.delete(TaskSchema).where(and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)))
    },

    getTaskHistory: async (id: number, userId: string) => {
        // First verify the task belongs to the user
        const task = await db.query.TaskSchema.findFirst({
            columns: { id: true },
        })

        if (!task) {
            throw new Error("Task not found")
        }

        const history = await db.query.TaskHistorySchema.findMany({
            where: eq(TaskHistorySchema.taskId, id),
            with: {
                task: true,
                fromCategory: true,
                toCategory: true,
            },
            orderBy: [desc(TaskHistorySchema.createdAt)],
        })

        return history.map((h) => {
            if (h.action === "created") {
                return `Has been created on ${h.createdAt?.toLocaleDateString()}`
            }
            if (h.action === "modified") {
                return `Has been modified on ${h.createdAt?.toLocaleDateString()}`
            }
            return `Has been ${h.action} from "${h.fromCategory?.title}" to "${h.toCategory?.title}" on ${h.createdAt?.toLocaleDateString()}`
        })
    },
}
