import express, { Request, Response, NextFunction } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env'
import connectDB from './config/db'
import authRoutes from './routes/auth.route'
import complaintRoutes from './routes/complaint.route'
import { initAIWorker } from './services/ai.services'
import { initSocket } from './sockets'
import { initNotificationService } from './services/notification.service'

const app = express()
const httpServer = createServer(app) // ← wrap express in http server

// Security middleware
app.use(helmet())
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
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

// Start server
const startServer = async () => {
  await connectDB()
  initAIWorker()

  // Init Socket.io
  const io = initSocket(httpServer)
  initNotificationService(io)

  httpServer.listen(env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env.PORT}`)
    console.log(`⚡ Socket.io ready on http://localhost:${env.PORT}`)
    console.log(`📋 Environment: ${env.NODE_ENV}`)
  })
}

startServer()

export default app