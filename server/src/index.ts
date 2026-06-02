import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import connectDB from './config/db'
import authRoutes from './routes/auth.route'
import complaintRoutes from './routes/complaint.route'
import { initAIWorker } from './services/ai.services'

const app = express()

app.use(helmet())
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: '🚀 AI Complaint Server is running',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/complaints', complaintRoutes)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('❌ Error:', err.message)
  res.status(500).json({
    success: false,
    message: env.isDev ? err.message : 'Internal server error',
  })
})

const startServer = async () => {
  await connectDB()
  initAIWorker()

  app.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`)
    console.log(`📋 Environment: ${env.NODE_ENV}`)
  })
}

startServer()

export default app