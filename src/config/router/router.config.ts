import express from "express"
import HealthCheckRouter from "../../features/health-check/health-check.router"

const v1Router = express.Router()

v1Router.use(`/health`, HealthCheckRouter)

export default v1Router
