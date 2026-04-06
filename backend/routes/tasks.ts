import { FastifyInstance } from 'fastify'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from '../controllers/taskController'

// This file connects each HTTP route to a controller function.
async function taskRoutes(app: FastifyInstance) {
  app.get('/', getTasks)
  app.post('/', createTask)
  app.put('/:id', updateTask)
  app.delete('/:id', deleteTask)
}

export default taskRoutes
