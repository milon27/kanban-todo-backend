1. setup a simple typescript project and express

```bash
pnpm i express cors dotenv zod cookie-parser
pnpm i typescript @types/express @types/node @types/cors @types/cookie-parser cross-env prettier tsx  -D
npx tsc --init

```

2. setup db and drizzle orm

- https://orm.drizzle.team/docs/get-started/mysql-new
- https://orm.drizzle.team/docs/get-started-mysql
- https://orm.drizzle.team/docs/sql-schema-declaration

3. setup better auth

- https://www.better-auth.com/docs/installation
- npx @better-auth/cli generate --config src/config/auth/auth.ts

<!-- how to assign the points automatically -->
