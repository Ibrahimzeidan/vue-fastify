# Simple Task Manager

This project is a beginner-friendly full-stack task manager built with:

- Vue 3 for the frontend
- Fastify for the backend
- MongoDB with Mongoose for the database

## Project Structure

```text
.
|-- frontend
|   |-- src
|   |   |-- components
|   |   |   |-- TaskForm.vue
|   |   |   |-- TaskItem.vue
|   |   |   `-- TaskList.vue
|   |   |-- router
|   |   |   `-- index.ts
|   |   |-- services
|   |   |   `-- taskApi.ts
|   |   |-- store
|   |   |   `-- taskStore.ts
|   |   |-- types
|   |   |   `-- task.ts
|   |   |-- views
|   |   |   `-- Tasks.vue
|   |   |-- App.vue
|   |   |-- main.ts
|   |   `-- vite-env.d.ts
|   |-- index.html
|   |-- package.json
|   |-- tsconfig.json
|   `-- vite.config.ts
|-- backend
|   |-- config
|   |   `-- db.ts
|   |-- controllers
|   |   `-- taskController.ts
|   |-- models
|   |   `-- Task.ts
|   |-- routes
|   |   `-- tasks.ts
|   |-- services
|   |   `-- taskService.ts
|   |-- .env
|   |-- app.ts
|   |-- package.json
|   |-- server.ts
|   `-- tsconfig.json
`-- README.md
```

## Features

- Add task
- Edit task
- Delete task
- Toggle completed

## MongoDB Connection String

The backend uses this connection string by default:

```text
mongodb://127.0.0.1:27017/task_manager
```

If you want to use MongoDB Atlas, set `MONGO_URL` in `backend/.env`.

Example Atlas connection string:

```text
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/task_manager?retryWrites=true&w=majority
```

If Atlas still refuses the connection, open `Network Access` in Atlas and add your current public IP address. For quick local development, you can temporarily allow `0.0.0.0/0`, then tighten it later.

## How To Run The Backend

1. Open a terminal in the project folder.
2. Go to the backend folder:

```powershell
cd backend
```

3. Install backend dependencies:

```powershell
npm install
```

4. If you want to use MongoDB Atlas, update `backend/.env`:

```powershell
MONGO_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/task_manager?retryWrites=true&w=majority
```

If you are using local MongoDB, you can skip the step above.

5. Start the backend server:

```powershell
npm run dev
```

If you want to build the TypeScript backend first:

```powershell
npm run build
npm start
```

The backend runs on:

```text
http://localhost:3001
```

## How To Run The Frontend

1. Open another terminal in the main project folder.
2. Go to the frontend folder:

```powershell
cd frontend
```

3. Install frontend dependencies:

```powershell
npm install
```

4. Start the Vue development server:

```powershell
npm run dev
```

If you want to check TypeScript types first:

```powershell
npm run type-check
```

The frontend usually runs on:

```text
http://localhost:5173
```

## API Endpoints

- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Notes

- The frontend code is inside the `frontend` folder.
- The frontend now uses TypeScript for the app files, router, store, and API service.
- The frontend uses Vue Router for the `/tasks` page and Pinia for task state.
- The frontend API file uses `http://localhost:3001/tasks` as the backend URL.
- The backend code also uses TypeScript with a simple controller and service structure.
- Make sure MongoDB is running if you use a local database.
- The code is kept simple on purpose so it is easy to learn from.
