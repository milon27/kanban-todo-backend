import { db } from "../../config/db/db.config"
import { CategorySchema } from "../../config/db/schema"
import { ICreateCategoryDto } from "./dto/category.dto"

export const CategoryService = {
    getAll: async () => {
        const list = await db.query.CategorySchema.findMany()
        return list
    },
    create: async (dto: ICreateCategoryDto) => {
        const category = await db.insert(CategorySchema).values({
            title: dto.title,
        })
        return category
    },
}
