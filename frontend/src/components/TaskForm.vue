<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task, TaskFormData } from '../types/task'

interface Props {
  taskToEdit?: Task | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  taskToEdit: null,
  loading: false
})

const emit = defineEmits<{
  (event: 'save-task', taskData: TaskFormData): void
  (event: 'cancel-edit'): void
}>()

// This stores what the user types into the input.
const title = ref('')

// Update the input when the selected task changes.
watch(
  () => props.taskToEdit,
  (newTask) => {
    title.value = newTask ? newTask.title : ''
  },
  { immediate: true }
)

// Send the form data to the parent component.
function submitForm(): void {
  const cleanTitle = title.value.trim()

  if (!cleanTitle) {
    return
  }

  emit('save-task', {
    id: props.taskToEdit?._id ?? null,
    title: cleanTitle,
    completed: props.taskToEdit?.completed ?? false
  })

  // Clear the input only when adding a new task.
  if (!props.taskToEdit) {
    title.value = ''
  }
}

// Tell the parent component to leave edit mode.
function cancelFormEdit(): void {
  title.value = ''
  emit('cancel-edit')
}
</script>

<template>
  <form class="task-form" @submit.prevent="submitForm">
    <label class="form-label" for="task-title">
      {{ taskToEdit ? 'Edit task' : 'Add a new task' }}
    </label>

    <div class="form-row">
      <input
        id="task-title"
        v-model="title"
        type="text"
        placeholder="Enter a task title"
        :disabled="loading"
      />

      <button type="submit" :disabled="loading">
        {{ taskToEdit ? 'Update' : 'Add' }}
      </button>

      <button
        v-if="taskToEdit"
        type="button"
        class="secondary-button"
        :disabled="loading"
        @click="cancelFormEdit"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  margin-bottom: 28px;
  padding: 22px;
  border: 1px solid rgba(183, 214, 255, 0.32);
  border-radius: 24px;
  background: linear-gradient(180deg, #f7fbff, #eaf3ff);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: #14345c;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.form-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

input {
  flex: 1;
  min-width: 220px;
  padding: 14px 16px;
  border: 1px solid rgba(35, 74, 125, 0.16);
  border-radius: 16px;
  background: #ffffff;
  color: #10233d;
  box-shadow: 0 16px 34px rgba(68, 122, 188, 0.08);
}

input:focus {
  outline: none;
  border-color: #4a97ff;
  box-shadow: 0 0 0 4px rgba(74, 151, 255, 0.18);
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #0d2340, #2f67ab);
  color: white;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 18px 34px rgba(13, 35, 64, 0.18);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 38px rgba(13, 35, 64, 0.24);
}

button:disabled,
input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.secondary-button {
  background: linear-gradient(135deg, #bfd9ff, #e7f1ff);
  color: #16345c;
  box-shadow: none;
}

.secondary-button:hover {
  box-shadow: none;
}

@media (max-width: 640px) {
  .task-form {
    padding: 18px;
    border-radius: 20px;
  }

  .form-row {
    gap: 10px;
  }

  button {
    width: 100%;
  }
}
</style>
