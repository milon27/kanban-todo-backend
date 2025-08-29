import { NextFunction, Request, Response } from "express"
import { StatusCode } from "../../config/constants/code.constant"
import { MyResponse } from "../../utils/my-response.util"
import { IIdNumParamDto } from "../../utils/params.dto"
import { ICreateTaskDto, IMoveTaskDto, IUpdateTaskDto } from "./dto/task.dto"
import { TaskService } from "./task.service"

export const TaskController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const list = await TaskService.getAll(userId)
            return res.status(StatusCode.OK).send(MyResponse(`get all tasks`, list))
        } catch (error) {
            return next(error)
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const { id } = req.params as unknown as IIdNumParamDto
            const task = await TaskService.getById(Number(id), userId)
            if (!task) {
                return res.status(StatusCode.NOT_FOUND).send(MyResponse("Task not found"))
            }
            return res.status(StatusCode.OK).send(MyResponse(`get task by id`, task))
        } catch (error) {
            return next(error)
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            await TaskService.create(req.body as ICreateTaskDto, userId)
            return res.status(StatusCode.OK).send(MyResponse(`created task`))
        } catch (error) {
            return next(error)
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const { id } = req.params as unknown as IIdNumParamDto
            const data = req.body as IUpdateTaskDto
            await TaskService.update(Number(id), data, userId)
            return res.status(StatusCode.OK).send(MyResponse(`updated task`))
        } catch (error) {
            return next(error)
        }
    },

    move: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const { id } = req.params as unknown as IIdNumParamDto
            const data = req.body as IMoveTaskDto
            await TaskService.move(Number(id), data, userId)
            return res.status(StatusCode.OK).send(MyResponse(`moved task`))
        } catch (error) {
            return next(error)
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const { id } = req.params as unknown as IIdNumParamDto
            await TaskService.delete(Number(id), userId)
            return res.status(StatusCode.OK).send(MyResponse(`deleted task`))
        } catch (error) {
            return next(error)
        }
    },

    getTaskHistory: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
            const { id } = req.params as unknown as IIdNumParamDto
            const history = await TaskService.getTaskHistory(Number(id), userId)
            return res.status(StatusCode.OK).send(MyResponse(`get task history`, history))
        } catch (error) {
            return next(error)
        }
    },
}
