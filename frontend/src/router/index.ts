import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'

// This array lists all pages in the app.
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  }
]

// Create the Vue Router instance.
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

