import { Server } from 'socket.io'

let io: Server | null = null

// Called once when server starts
export const initNotificationService = (socketIo: Server): void => {
  io = socketIo
  console.log('✅ Notification service initialized')
}

// Emit to everyone in a complaint room
export const notifyComplaintRoom = (
  complaintId: string,
  event: string,
  data: object
): void => {
  if (!io) return
  io.to(`complaint:${complaintId}`).emit(event, data)
}

// Emit to a specific user
export const notifyUser = (
  userId: string,
  event: string,
  data: object
): void => {
  if (!io) return
  io.to(`user:${userId}`).emit(event, data)
}

// Emit to all agents
export const notifyAgents = (event: string, data: object): void => {
  if (!io) return
  io.to('agents').emit(event, data)
}

// Emit to all admins
export const notifyAdmins = (event: string, data: object): void => {
  if (!io) return
  io.to('admins').emit(event, data)
}