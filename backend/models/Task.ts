import mongoose, { Schema } from 'mongoose'

// This interface describes the shape of one task.
export interface Task {
  title: string
  completed: boolean
  createdAt: Date
}

// This schema tells MongoDB how a task should look.
const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const TaskModel = mongoose.model<Task>('Task', taskSchema)

export default TaskModel

