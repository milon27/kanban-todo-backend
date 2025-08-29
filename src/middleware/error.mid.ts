import { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { ErrorCode, StatusCode } from "../config/constants/code.constant"
import { MyErrorResponse } from "../utils/my-response.util"

export const notFoundMid = (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCode.NOT_FOUND).send(MyErrorResponse(ErrorCode.NOT_FOUND, `Route not found`))
    } catch (error) {
        next()
    }
}

export const globalErrorMid = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
    console.error("globalErrorMid: ", err)
    return res
        .status(StatusCode.SERVER_ERROR)
        .json(MyErrorResponse(ErrorCode.SERVER_ERROR, (err as unknown as Error).message))
}
