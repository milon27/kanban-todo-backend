import { and, asc, desc, eq } from "drizzle-orm"
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

        await db
            .update(TaskSchema)
            .set(updateData)
            .where(and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)))
    },

    move: async (id: number, dto: IMoveTaskDto, userId: string) => {
        // Get current task that we want to move
        const currentTask = await db.query.TaskSchema.findFirst({
            where: and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)),
        })

        if (!currentTask) {
            throw new Error("Task not found")
        }

        // Update task position and category
        await db
            .update(TaskSchema)
            .set({
                categoryId: dto.categoryId,
                position: dto.position,
            })
            .where(and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)))

        // Create task history for the move
        await db.insert(TaskHistorySchema).values({
            taskId: id,
            fromCategoryId: currentTask.categoryId,
            toCategoryId: dto.categoryId,
            action: "moved",
        })
    },

    delete: async (id: number, userId: string) => {
        await db.delete(TaskSchema).where(and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)))
    },

    getTaskHistory: async (id: number, userId: string) => {
        // First verify the task belongs to the user
        const task = await db.query.TaskSchema.findFirst({
            where: and(eq(TaskSchema.id, id), eq(TaskSchema.userId, userId)),
        })

        if (!task) {
            throw new Error("Task not found")
        }

        const history = await db.query.TaskHistorySchema.findMany({
            where: eq(TaskHistorySchema.taskId, id),
            orderBy: [desc(TaskHistorySchema.createdAt)],
        })

        return history
    },
}
