import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodTypeAny, z } from "zod"
import { ErrorCode, StatusCode } from "../config/constants/code.constant"
import { MyErrorResponse } from "../utils/my-response.util"

export const validateMid = ({
    body,
    params,
    query,
}: {
    body?: ZodTypeAny
    params?: AnyZodObject
    query?: AnyZodObject
}) => {
    const schemaFields: Record<string, ZodTypeAny> = {}

    if (body !== undefined) {
        schemaFields.body = body
    }
    if (params !== undefined) {
        schemaFields.params = params
    }
    if (query !== undefined) {
        schemaFields.query = query
    }

    const schema = z.object(schemaFields) as AnyZodObject
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validationData: Record<string, any> = {}

            if (body !== undefined) {
                validationData.body = req.body
            }
            if (params !== undefined) {
                validationData.params = req.params
            }
            if (query !== undefined) {
                validationData.query = req.query
            }

            const reqObjCk = schema.safeParse(validationData)
            if (reqObjCk.success) {
                return next()
            }

            const errors = reqObjCk.error.format()
            console.error("validateMid: ", errors)
            return res.status(StatusCode.BAD_REQUEST).send(MyErrorResponse(ErrorCode.BAD_REQUEST, errors))
        } catch (err) {
            console.error("validateMid: catch -> ", err)
            return res
                .status(StatusCode.BAD_REQUEST)
                .send(MyErrorResponse(ErrorCode.BAD_REQUEST, "Invalid Request Body!"))
        }
    }
}
