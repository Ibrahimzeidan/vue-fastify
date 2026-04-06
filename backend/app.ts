import Fastify from 'fastify'
import cors from '@fastify/cors'
import taskRoutes from './routes/tasks'

// This function creates and configures the Fastify app.
function buildApp() {
  const app = Fastify({
    logger: true
  })

  // Allow frontend apps to call this API from the browser.
  app.register(cors, {
    origin: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  })

  // All task routes will start with /tasks.
  app.register(taskRoutes, {
    prefix: '/tasks'
  })

  return app
}

export default buildApp
