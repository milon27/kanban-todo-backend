import express from "express"
import CategoryRouter from "../../features/category/category.router"
import HealthCheckRouter from "../../features/health-check/health-check.router"

const v1Router = express.Router()

v1Router.use(`/health`, HealthCheckRouter)
v1Router.use(`/category`, CategoryRouter)

export default v1Router
