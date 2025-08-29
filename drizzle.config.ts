import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    out: "./src/config/db/migrations",
    schema: "./src/config/db/schema",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})
