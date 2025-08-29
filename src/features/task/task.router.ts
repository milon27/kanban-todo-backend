import { Router } from "express"
import { AuthMid } from "../../middleware/auth.mid"
import { validateMid } from "../../middleware/validate.mid"
import { IdNumParamDto } from "../../utils/params.dto"
import { CreateTaskDto, MoveTaskDto, UpdateTaskDto } from "./dto/task.dto"
import { TaskController } from "./task.controller"

const TaskRouter = Router()

TaskRouter.use(AuthMid.isLoggedInMid)

/**
 * @description get all tasks
 * @url {{BASE_URL}}/v1/task
 */
TaskRouter.get("/", TaskController.getAll)

/**
 * @description get task by id
 * @url {{BASE_URL}}/v1/task/:id
 */
TaskRouter.get("/:id", TaskController.getById)

/**
 * @description create task
 * @url {{BASE_URL}}/v1/task
 */
TaskRouter.post(
    "/",
    validateMid({
        body: CreateTaskDto,
    }),
    TaskController.create
)

/**
 * @description update task
 * @url {{BASE_URL}}/v1/task/:id
 */
TaskRouter.put(
    "/:id",
    validateMid({
        body: UpdateTaskDto,
        params: IdNumParamDto,
    }),
    TaskController.update
)

/**
 * @description move task (change category and position)
 * @url {{BASE_URL}}/v1/task/:id/move
 */
TaskRouter.put(
    "/:id/move",
    validateMid({
        body: MoveTaskDto,
        params: IdNumParamDto,
    }),
    TaskController.move
)

/**
 * @description delete task
 * @url {{BASE_URL}}/v1/task/:id
 */
TaskRouter.delete(
    "/:id",
    validateMid({
        params: IdNumParamDto,
    }),
    TaskController.delete
)

/**
 * @description get task history
 * @url {{BASE_URL}}/v1/task/:id/history
 */
TaskRouter.get(
    "/:id/history",
    validateMid({
        params: IdNumParamDto,
    }),
    TaskController.getTaskHistory
)

export default TaskRouter
