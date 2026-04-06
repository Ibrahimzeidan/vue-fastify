<script setup lang="ts">
import type { Task } from '../types/task'

defineProps<{
  // This is one task object to display.
  task: Task
}>()

defineEmits<{
  (event: 'edit-task', task: Task): void
  (event: 'toggle-task', task: Task): void
  (event: 'delete-task', taskId: string): void
}>()
</script>

<template>
  <div class="task-item">
    <label class="task-left">
      <input
        :checked="task.completed"
        type="checkbox"
        @change="$emit('toggle-task', task)"
      />

      <span :class="{ completed: task.completed }">
        {{ task.title }}
      </span>
    </label>

    <div class="task-actions">
      <button class="edit-button" @click="$emit('edit-task', task)">
        Edit
      </button>
      <button class="delete-button" @click="$emit('delete-task', task._id)">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid rgba(183, 214, 255, 0.34);
  border-radius: 22px;
  background: linear-gradient(180deg, #ffffff, #f3f9ff);
  box-shadow: 0 18px 34px rgba(13, 35, 64, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 40px rgba(13, 35, 64, 0.12);
}

.task-left {
  display: flex;
  align-items: center;
  gap: 10px;
  word-break: break-word;
  color: #10233d;
  font-weight: 600;
}

input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #16345c;
}

.completed {
  text-decoration: line-through;
  color: #6881a1;
}

.task-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 10px 14px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

.edit-button {
  background: #dcecff;
  color: #16345c;
}

.delete-button {
  background: #0d2340;
  color: #ffffff;
}

@media (max-width: 640px) {
  .task-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .task-actions {
    width: 100%;
  }

  button {
    flex: 1;
  }
}
</style>
