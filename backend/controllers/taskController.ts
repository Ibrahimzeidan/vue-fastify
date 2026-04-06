import { FastifyReply, FastifyRequest } from 'fastify'
import * as taskService from '../services/taskService'
import { ServiceError } from '../services/taskService'

interface CreateTaskBody {
  title?: string
}

interface UpdateTaskBody {
  title?: string
  completed?: boolean
}

interface TaskParams {
  id: string
}

// Convert a service error into an HTTP response.
function sendError(
  reply: FastifyReply,
  error: unknown,
  defaultMessage: string
) {
  const serviceError = error as ServiceError

  return reply.code(serviceError.statusCode || 500).send({
    message: serviceError.message || defaultMessage
  })
}

// Get all tasks and send them back to the client.
export async function getTasks(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const tasks = await taskService.getAllTasks()
    return reply.send(tasks)
  } catch (error) {
    return sendError(reply, error, 'Could not fetch tasks.')
  }
}

// Create a new task and send the result.
export async function createTask(
  request: FastifyRequest<{ Body: CreateTaskBody }>,
  reply: FastifyReply
) {
  try {
    const newTask = await taskService.createTask(request.body?.title)
    return reply.code(201).send(newTask)
  } catch (error) {
    return sendError(reply, error, 'Could not create task.')
  }
}

// Update a task by ID and send the result.
export async function updateTask(
  request: FastifyRequest<{ Params: TaskParams; Body: UpdateTaskBody }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params
    const updatedTask = await taskService.updateTask(
      id,
      request.body?.title,
      request.body?.completed
    )

    return reply.send(updatedTask)
  } catch (error) {
    return sendError(reply, error, 'Could not update task.')
  }
}

// Delete a task by ID.
export async function deleteTask(
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) {
  try {
    const result = await taskService.deleteTask(request.params.id)
    return reply.send(result)
  } catch (error) {
    return sendError(reply, error, 'Could not delete task.')
  }
}
