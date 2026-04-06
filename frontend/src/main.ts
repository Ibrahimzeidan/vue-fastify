import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Create the Vue app.
const app = createApp(App)

// Add Pinia so we can store task data in one shared place.
app.use(createPinia())

// Add Vue Router so the app can show pages by URL.
app.use(router)

// Mount the app to the page.
app.mount('#app')

