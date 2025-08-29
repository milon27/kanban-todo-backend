import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"
import { db } from "../db/db.config"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
    }),
    telemetry: {
        enabled: false,
    },
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        openAPI(), // http://localhost:4000/api/auth/reference
    ],
})
