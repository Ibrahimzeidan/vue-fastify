import dotenv from 'dotenv'
import type { IncomingMessage, ServerResponse } from 'http'
import buildApp from '../app'
import connectDatabase from '../config/db'

dotenv.config()

const app = buildApp()
let isReady = false

async function ensureReady() {
  if (isReady) {
    return
  }

  await connectDatabase()
  await app.ready()
  isReady = true
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    await ensureReady()
    const originalUrl = req.url ?? ''
    if (originalUrl.startsWith('/api')) {
      req.url = originalUrl.replace(/^\/api/, '') || '/'
    }
    app.server.emit('request', req, res)
  } catch (error) {
    app.log.error(error)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
}
