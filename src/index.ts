import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import v1Router from "./config/router/router.config"
import { globalErrorMid, notFoundMid } from "./middleware/error.mid"

// init
const app = express()

// middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))

// routers
app.use("/v1", v1Router)

// global error handle
app.use(notFoundMid)
app.use(globalErrorMid)

// listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.info(`Server Running on port ${PORT}`)
})
