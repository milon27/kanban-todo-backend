import { Router } from "express"
import { HealthCheckController } from "./health-check.controller"

const HealthCheckRouter = Router()

/**
 * @description Check home route
 * @url {{BASE_URL}}/health
 */
HealthCheckRouter.get("/", HealthCheckController.getBasicInfo)

export default HealthCheckRouter
