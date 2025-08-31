# backend api for task management system

- Kanban board style todo app or task management app API with express js

## Run on development

- Run frontend from this repo: https://github.com/milon27/kanban-todo-frontend
- Run frontend

```bash
pnpm i # install all dependencies
pnpm dev # run development server on port 4000
```

## tech stack

- typescript
- Express JS
- Node JS
- MySQL
- Drizzle ORM
- Better auth (authentication)

## basic database structure (mysql + drizzle orm)

1. user table
2. category table(title)
3. task table (title, description, expire date)
4. task history (created at date with category todo, move to in progress at date etc.)

## API endpoints

1. for authentication i will use better auth
2. create new category/column
3. update category/column
4. get all column (user specific)
5. create new task on each category
6. get a task with history
7. update a task
8. get all task
9. move status and position of a task
10. get all activity history of a task by id
