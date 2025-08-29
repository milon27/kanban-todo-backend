import z from "zod"

export const CreateTaskDto = z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    categoryId: z.number().int().positive(),
    expireDate: z.string().datetime().optional(),
    position: z.number().int().positive(),
})

export type ICreateTaskDto = z.infer<typeof CreateTaskDto>

export const UpdateTaskDto = CreateTaskDto.partial()

export type IUpdateTaskDto = z.infer<typeof UpdateTaskDto>

export const MoveTaskDto = z.object({
    categoryId: z.number().int().positive(),
    position: z.number().int().positive(),
})

export type IMoveTaskDto = z.infer<typeof MoveTaskDto>
