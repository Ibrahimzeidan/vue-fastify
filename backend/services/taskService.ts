import TaskModel from '../models/Task'

// This type describes a simple error object for service functions.
export interface ServiceError extends Error {
  statusCode?: number
}

// Create an error with both a message and an HTTP status code.
function createServiceError(message: string, statusCode: number): ServiceError {
  const error = new Error(message) as ServiceError
  error.statusCode = statusCode
  return error
}

// Check the title and return a clean value we can save in MongoDB.
function validateTitle(title?: string) {
  if (!title || !title.trim()) {
    throw createServiceError('Task title is required.', 400)
  }

  return title.trim()
}

// Get all tasks from MongoDB, newest first.
export async function getAllTasks() {
  return TaskModel.find().sort({ createdAt: -1 })
}

// Create a new task in MongoDB.
export async function createTask(title?: string) {
  const cleanTitle = validateTitle(title)

  return TaskModel.create({
    title: cleanTitle
  })
}

// Update one task by its ID.
export async function updateTask(
  id: string,
  title?: string,
  completed?: boolean
) {
  const cleanTitle = validateTitle(title)

  const updateData: {
    title: string
    completed?: boolean
  } = {
    title: cleanTitle
  }

  if (typeof completed === 'boolean') {
    updateData.completed = completed
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  })

  if (!updatedTask) {
    throw createServiceError('Task not found.', 404)
  }

  return updatedTask
}

// Delete one task by its ID.
export async function deleteTask(id: string) {
  const deletedTask = await TaskModel.findByIdAndDelete(id)

  if (!deletedTask) {
    throw createServiceError('Task not found.', 404)
  }

  return {
    message: 'Task deleted successfully.'
  }
}
