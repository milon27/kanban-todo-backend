import { and, eq } from "drizzle-orm"
import { db } from "../../config/db/db.config"
import { CategorySchema } from "../../config/db/schema"
import { ICreateCategoryDto, IUpdateCategoryDto } from "./dto/category.dto"

export const CategoryService = {
    getAll: async () => {
        const list = await db.query.CategorySchema.findMany()
        return list
    },
    create: async (userId: string, dto: ICreateCategoryDto) => {
        const category = await db.insert(CategorySchema).values({
            userId: userId,
            title: dto.title,
        })
        return category
    },
    update: async (id: number, userId: string, dto: IUpdateCategoryDto) => {
        await db
            .update(CategorySchema)
            .set({ title: dto.title })
            .where(and(eq(CategorySchema.userId, userId), eq(CategorySchema.id, id)))
    },
}
