import { Request, Response } from "express"
import { ErrorCode, StatusCode } from "../../config/constants/code.constant"
import { MyErrorResponse, MyResponse } from "../../utils/my-response.util"

export const HealthCheckController = {
    getBasicInfo: (req: Request, res: Response) => {
        if (process.env.NODE_ENV) {
            res.send(MyResponse("Success", `Running app in ${process.env.NODE_ENV}... 🚀`))
        } else {
            res.status(StatusCode.SERVER_ERROR).send(MyErrorResponse(ErrorCode.SERVER_ERROR, "env not loaded.."))
        }
    },
}
