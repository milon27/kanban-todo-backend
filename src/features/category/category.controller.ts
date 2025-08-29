import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constants/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { IIdNumParamDto } from "../../utils/params.dto"
import { CategoryService } from "./category.service"
import { ICreateCategoryDto, IUpdateCategoryDto } from "./dto/category.dto"

export const CategoryController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const list = await CategoryService.getAll()
            return res.status(StatusCode.OK).send(MyResponse(`get all category or column`, list))
        } catch (error) {
            return next(error)
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await CategoryService.create(req.body as ICreateCategoryDto)
            return res.status(StatusCode.OK).send(MyResponse(`created category or column`))
        } catch (error) {
            return next(error)
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params as unknown as IIdNumParamDto
            const data = req.body as IUpdateCategoryDto
            await CategoryService.update(Number(id), data)
            return res.status(StatusCode.OK).send(MyResponse(`updated category or column`))
        } catch (error) {
            return next(error)
        }
    },
}
