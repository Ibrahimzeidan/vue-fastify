import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createTask as createTaskRequest,
  deleteTask as deleteTaskRequest,
  getTasks as getTasksRequest,
  updateTask as updateTaskRequest
} from '../services/taskApi'
import type { Task, UpdateTaskData } from '../types/task'

interface ApiErrorResponse {
  message?: string
}

// Read a friendly message from an API error.
function getErrorMessage(error: unknown, fallbackMessage: string): string {
  const axiosError = error as AxiosError<ApiErrorResponse>
  return axiosError.response?.data?.message || fallbackMessage
}

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const errorMessage = ref('')

  // Clear the old error before starting a new request.
  function clearError(): void {
    errorMessage.value = ''
  }

  // Load all tasks from the backend.
  async function fetchTasks(): Promise<void> {
    loading.value = true
    clearError()

    try {
      tasks.value = await getTasksRequest()
    } catch (error) {
      errorMessage.value = getErrorMessage(
        error,
        'Could not load tasks. Please check the backend server.'
      )
    } finally {
      loading.value = false
    }
  }

  // Add a new task to the backend and the store.
  async function addTask(title: string): Promise<Task | null> {
    loading.value = true
    clearError()

    try {
      const newTask = await createTaskRequest(title)
      tasks.value.unshift(newTask)
      return newTask
    } catch (error) {
      errorMessage.value = getErrorMessage(error, 'Could not create task.')
      return null
    } finally {
      loading.value = false
    }
  }

  // Update one task in the backend and in the store.
  async function updateTask(
    id: string,
    data: UpdateTaskData
  ): Promise<Task | null> {
    loading.value = true
    clearError()

    try {
      const updatedTask = await updateTaskRequest(id, data)
      const taskIndex = tasks.value.findIndex((task) => task._id === id)

      if (taskIndex !== -1) {
        tasks.value.splice(taskIndex, 1, updatedTask)
      }

      return updatedTask
    } catch (error) {
      errorMessage.value = getErrorMessage(error, 'Could not update task.')
      return null
    } finally {
      loading.value = false
    }
  }

  // Delete one task from the backend and remove it from the store.
  async function deleteTask(id: string): Promise<boolean> {
    loading.value = true
    clearError()

    try {
      await deleteTaskRequest(id)
      tasks.value = tasks.value.filter((task) => task._id !== id)
      return true
    } catch (error) {
      errorMessage.value = getErrorMessage(error, 'Could not delete task.')
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    errorMessage,
    clearError,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  }
})
