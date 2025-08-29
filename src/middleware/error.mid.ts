import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ErrorCode, StatusCode } from "../config/constants/code.constant"
import { ServerError } from "../types/error.type"
import { MyErrorResponse } from "../utils/my-response.util"

export const notFoundMid = (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCode.NOT_FOUND).send(MyErrorResponse(ErrorCode.NOT_FOUND, `Route not found`))
    } catch (error) {
        next()
    }
}

export const globalErrorMid = (e: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
    console.error("globalErrorMid: ", e)
    if (e instanceof ServerError) {
        return res.status(e.statusCode).json(MyErrorResponse(e.errorCode, (e as Error).message))
    }
    const error = e as unknown as Error
    let code = ErrorCode.SERVER_ERROR
    let statusCode = StatusCode.SERVER_ERROR
    let errorMessage = error.message
    return res.status(statusCode).json(MyErrorResponse(code, errorMessage))
}
