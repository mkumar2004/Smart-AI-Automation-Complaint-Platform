import mongoose from 'mongoose'
import { env } from './env'

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      dbName: 'ai-complaint-db',
    })

    console.log(`✅ MongoDB connected: ${conn.connection.host}`)

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB error: ${err.message}`)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Retrying...')
    })

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error)
    process.exit(1)
  }
}

export default connectDB