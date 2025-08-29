import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { CategoryController } from "./category.controller"
import { CreateCategoryDto } from "./dto/category.dto"

const CategoryRouter = Router()

CategoryRouter.use(AuthMid.isLoggedInMid)

/**
 * @description get all category
 * @url {{BASE_URL}}/v1/category
 */
CategoryRouter.get("/", CategoryController.getAll)

/**
 * @description create category
 * @url {{BASE_URL}}/v1/category
 */
CategoryRouter.post(
    "/",
    validateMid({
        body: CreateCategoryDto,
    }),
    CategoryController.create
)

export default CategoryRouter
