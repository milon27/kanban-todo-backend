import "dotenv/config"
import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
import * as schema from "./schema"

const poolConnection = mysql.createPool({
    uri: `${process.env.DATABASE_URL}`,
})

export const db = drizzle({
    client: poolConnection,
    schema,
    mode: "default", // its required as we are not using planetscale
})
export type IDb = typeof db
