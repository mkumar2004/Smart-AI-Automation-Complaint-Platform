import { Server, Socket } from 'socket.io'
import { Server as HttpServer } from 'http'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { registerComplaintHandlers } from './handlers/complaint.handler'
import { registerAgentHandlers } from './handlers/agent.handler'

interface JwtPayload {
  id: string
  role: string
}

export const initSocket = (httpServer: HttpServer): Server => {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  })

  // ── Auth middleware ──────────────────────────────
  io.use((socket: Socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.split(' ')[1]

      if (!token) {
        return next(new Error('Authentication required'))
      }

      const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
      socket.data.userId = decoded.id
      socket.data.role = decoded.role
      next()
    } catch {
      next(new Error('Invalid token'))
    }
  })

  // ── Connection handler ───────────────────────────
  io.on('connection', (socket: Socket) => {
    const { userId, role } = socket.data

    console.log(`⚡ Connected: ${userId} (${role}) — socket: ${socket.id}`)

    // Join personal room (for direct notifications)
    socket.join(`user:${userId}`)

    // Join role room
    if (role === 'agent') socket.join('agents')
    if (role === 'admin') {
      socket.join('admins')
      socket.join('agents') // admins get agent notifications too
    }

    // Confirm connection to client
    socket.emit('connected', {
      message: 'Real-time connection established',
      userId,
      role,
    })

    // Register event handlers
    registerComplaintHandlers(socket)
    registerAgentHandlers(socket)

    // ── Disconnect ─────────────────────────────────
    socket.on('disconnect', (reason) => {
      console.log(`❌ Disconnected: ${userId} — reason: ${reason}`)
    })
  })

  console.log('✅ Socket.io initialized')
  return io
}