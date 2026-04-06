// This interface describes one task from the backend.
export interface Task {
  _id: string
  title: string
  completed: boolean
  createdAt: string
}

// This interface describes the form data used in the UI.
export interface TaskFormData {
  id: string | null
  title: string
  completed: boolean
}

// This interface describes the data sent when updating a task.
export interface UpdateTaskData {
  title: string
  completed: boolean
}

