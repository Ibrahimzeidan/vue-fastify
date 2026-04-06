import mongoose from 'mongoose'

function isAtlasAuthError(error: unknown): error is {
  code?: number
  codeName?: string
  message?: string
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    (error as { code?: number }).code === 8000
  )
}

function isAtlasNetworkAccessError(error: unknown): error is {
  name?: string
  message?: string
} {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const name = 'name' in error ? String(error.name) : ''
  const message = 'message' in error ? String(error.message) : ''

  return (
    name === 'MongooseServerSelectionError' &&
    /MongoDB Atlas cluster|whitelist|ReplicaSetNoPrimary|Network Access/i.test(
      message
    )
  )
}

// This function connects the app to MongoDB.
async function connectDatabase() {
  const mongoUrl = process.env.MONGO_URL?.trim()

  if (!mongoUrl) {
    throw new Error('MONGO_URL is missing in the .env file.')
  }

  try {
    await mongoose.connect(mongoUrl)
    console.log('Connected to MongoDB')
  } catch (error) {
    if (isAtlasNetworkAccessError(error)) {
      throw new Error(
        'MongoDB Atlas blocked the connection while selecting a server. In Atlas, open Network Access and add your current public IP address, or use 0.0.0.0/0 temporarily for development. After saving the rule, wait a minute and restart the backend.'
      )
    }

    if (isAtlasAuthError(error)) {
      throw new Error(
        'MongoDB Atlas rejected the credentials in MONGO_URL. Generate a fresh Atlas connection string, verify the database username/password, and URL-encode special characters in the password before saving it to backend/.env.'
      )
    }

    throw error
  }
}

export default connectDatabase
