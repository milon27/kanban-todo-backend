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
    const schema = z.object({
        body: body || z.object({}),
        params: params || z.object({}),
        query: query || z.object({}),
    }) as AnyZodObject
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const reqObjCk = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params,
            })
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
