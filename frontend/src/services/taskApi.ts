import axios from 'axios'
import type { Task, UpdateTaskData } from '../types/task'

const defaultBaseUrl = import.meta.env.PROD
  ? '/api/tasks'
  : 'http://localhost:3001/tasks'

// This Axios instance points to the Fastify backend.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultBaseUrl
})

// Get all tasks from the backend.
export async function getTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/')
  return response.data
}

// Create one new task.
export async function createTask(title: string): Promise<Task> {
  const response = await apiClient.post<Task>('/', {
    title
  })
  return response.data
}

// Update one task by its ID.
export async function updateTask(
  id: string,
  data: UpdateTaskData
): Promise<Task> {
  const response = await apiClient.put<Task>(`/${id}`, data)
  return response.data
}

// Delete one task by its ID.
export async function deleteTask(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(`/${id}`)
  return response.data
}
