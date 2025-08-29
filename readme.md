# backend api for task management system

## tech stack

- typescript
- Express JS
- Node JS
- MySQL
- Drizzle ORM
- Better auth (authentication)

## basic database structure (mysql + drizzle orm)

1. user table
2. status table(title)
3. task table (title, description, expire date)
4. track task history (created at date with status todo, move to in progress at date etc.)

## possible API endpoints

1. for authentication i will use better auth
2. create new status/column
3. get all column
4. create new task
5. update a task
6. get all task
7. move status and position of a task
8. get all activity of a task by id
