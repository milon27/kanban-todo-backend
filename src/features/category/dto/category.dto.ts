import z from "zod"

// export const CreateCategoryDto = createInsertSchema(CategorySchema)

export const CreateCategoryDto = z.object({
    title: z.string().nonempty(),
})

export type ICreateCategoryDto = z.infer<typeof CreateCategoryDto>
