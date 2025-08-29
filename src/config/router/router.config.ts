import express from "express"
import CategoryRouter from "../../features/category/category.router"
import HealthCheckRouter from "../../features/health-check/health-check.router"
import TaskRouter from "../../features/task/task.router"

const v1Router = express.Router()

v1Router.use(`/health`, HealthCheckRouter)
v1Router.use(`/category`, CategoryRouter)
v1Router.use(`/task`, TaskRouter)

export default v1Router
