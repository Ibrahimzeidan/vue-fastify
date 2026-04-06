import dotenv from 'dotenv'
import buildApp from './app'
import connectDatabase from './config/db'

// Load values from the .env file into process.env.
dotenv.config()

const app = buildApp()
const port = Number(process.env.PORT) || 3001

// This function connects to MongoDB and starts the Fastify server.
async function startServer() {
  try {
    await connectDatabase()

    await app.listen({
      port,
      host: '0.0.0.0'
    })

    console.log(`Server is running on http://localhost:${port}`)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

startServer()

