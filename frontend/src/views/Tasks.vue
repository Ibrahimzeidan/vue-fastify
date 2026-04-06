<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import { useTaskStore } from '../store/taskStore'
import type { Task, TaskFormData } from '../types/task'

const taskStore = useTaskStore()
const { tasks, loading, errorMessage } = storeToRefs(taskStore)

// This stores the task that is being edited.
const taskToEdit = ref<Task | null>(null)

// Load tasks when this page opens.
onMounted(() => {
  taskStore.fetchTasks()
})

const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(
  () => tasks.value.filter((task) => task.completed).length
)
const pendingTasks = computed(() => totalTasks.value - completedTasks.value)

// Add a new task or update an existing one.
async function saveTask(taskData: TaskFormData): Promise<void> {
  if (taskData.id) {
    const updatedTask = await taskStore.updateTask(taskData.id, {
      title: taskData.title,
      completed: taskData.completed
    })

    if (updatedTask) {
      taskToEdit.value = null
    }

    return
  }

  await taskStore.addTask(taskData.title)
}

// Put one task into edit mode.
function startEdit(task: Task): void {
  taskToEdit.value = { ...task }
}

// Leave edit mode without saving.
function cancelEdit(): void {
  taskToEdit.value = null
}

// Switch a task between completed and not completed.
async function toggleTask(task: Task): Promise<void> {
  const updatedTask = await taskStore.updateTask(task._id, {
    title: task.title,
    completed: !task.completed
  })

  if (taskToEdit.value && updatedTask && taskToEdit.value._id === task._id) {
    taskToEdit.value = { ...updatedTask }
  }
}

// Delete a task and clear edit mode if needed.
async function deleteTask(taskId: string): Promise<void> {
  const wasDeleted = await taskStore.deleteTask(taskId)

  if (wasDeleted && taskToEdit.value && taskToEdit.value._id === taskId) {
    taskToEdit.value = null
  }
}
</script>

<template>
  <div class="tasks-page">
    <section class="hero-panel">
      <div class="hero-copy">
        <p class="hero-label">Task Overview</p>
        <h2>Stay focused with a cleaner task dashboard.</h2>
        <p class="hero-text">
          Organize your work, update progress quickly, and keep everything easy
          to scan.
        </p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span>Total</span>
          <strong>{{ totalTasks }}</strong>
        </div>
        <div class="stat-card">
          <span>Completed</span>
          <strong>{{ completedTasks }}</strong>
        </div>
        <div class="stat-card">
          <span>Pending</span>
          <strong>{{ pendingTasks }}</strong>
        </div>
      </div>
    </section>

    <div class="task-card">
      <TaskForm
        :task-to-edit="taskToEdit"
        :loading="loading"
        @save-task="saveTask"
        @cancel-edit="cancelEdit"
      />

      <TaskList
        :tasks="tasks"
        :loading="loading"
        :error-message="errorMessage"
        @edit-task="startEdit"
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
      />
    </div>
  </div>
</template>

<style scoped>
.tasks-page {
  max-width: 1080px;
  margin: 0 auto;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.9fr);
  gap: 24px;
  margin-bottom: 24px;
  padding: 28px;
  border: 1px solid rgba(183, 214, 255, 0.26);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(10, 27, 50, 0.94), rgba(27, 67, 117, 0.86));
  box-shadow: 0 24px 60px rgba(7, 21, 38, 0.18);
}

.hero-label {
  margin: 0 0 10px;
  color: #b8d5ff;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero-copy h2 {
  margin: 0 0 12px;
  color: #ffffff;
  font-size: clamp(1.9rem, 2.8vw, 2.8rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.hero-text {
  margin: 0;
  max-width: 580px;
  color: rgba(231, 241, 255, 0.82);
  font-size: 1rem;
  line-height: 1.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  align-self: end;
}

.stat-card {
  padding: 18px;
  border: 1px solid rgba(183, 214, 255, 0.24);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06));
  backdrop-filter: blur(10px);
}

.stat-card span {
  display: block;
  margin-bottom: 8px;
  color: #d3e6ff;
  font-size: 0.86rem;
}

.stat-card strong {
  color: #ffffff;
  font-size: 2rem;
  letter-spacing: -0.05em;
}

.task-card {
  padding: 28px;
  border: 1px solid rgba(183, 214, 255, 0.34);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 24px 60px rgba(7, 21, 38, 0.12);
  backdrop-filter: blur(12px);
}

@media (max-width: 880px) {
  .hero-panel {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero-panel,
  .task-card {
    padding: 20px;
    border-radius: 22px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
