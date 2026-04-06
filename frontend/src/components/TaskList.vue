<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task } from '../types/task'

defineProps<{
  tasks: Task[]
  loading: boolean
  errorMessage: string
}>()

defineEmits<{
  (event: 'edit-task', task: Task): void
  (event: 'toggle-task', task: Task): void
  (event: 'delete-task', taskId: string): void
}>()
</script>

<template>
  <section>
    <p v-if="loading" class="info-text">Loading tasks...</p>
    <p v-else-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    <p v-else-if="tasks.length === 0" class="empty-text">
      No tasks yet. Add your first task above.
    </p>

    <div v-else class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        @edit-task="$emit('edit-task', $event)"
        @toggle-task="$emit('toggle-task', $event)"
        @delete-task="$emit('delete-task', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-text {
  margin: 0;
  padding: 16px 18px;
  border: 1px solid rgba(125, 181, 255, 0.34);
  border-radius: 18px;
  background: #eef6ff;
  color: #16345c;
  font-weight: 600;
}

.error-text {
  margin: 0;
  padding: 16px 18px;
  border: 1px solid rgba(192, 54, 54, 0.14);
  border-radius: 18px;
  background: #fff3f3;
  color: #9c2f2f;
  font-weight: 600;
}

.empty-text {
  margin: 0;
  padding: 22px;
  border: 1px dashed rgba(35, 74, 125, 0.22);
  border-radius: 20px;
  background: linear-gradient(180deg, #f8fbff, #eef6ff);
  color: #4d6481;
  text-align: center;
}
</style>
