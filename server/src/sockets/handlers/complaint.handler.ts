import { Socket } from 'socket.io'

export const registerComplaintHandlers = (socket: Socket): void => {

  // Customer/Agent joins a complaint room to get live updates
  socket.on('complaint:join', (complaintId: string) => {
    socket.join(`complaint:${complaintId}`)
    console.log(`👤 ${socket.id} joined complaint room: ${complaintId}`)
    socket.emit('complaint:joined', {
      complaintId,
      message: 'You are now tracking this complaint live',
    })
  })

  // Leave complaint room
  socket.on('complaint:leave', (complaintId: string) => {
    socket.leave(`complaint:${complaintId}`)
    console.log(`👤 ${socket.id} left complaint room: ${complaintId}`)
  })

  // Typing indicator in complaint chat
  socket.on('complaint:typing', (data: { complaintId: string; userName: string }) => {
    socket.to(`complaint:${data.complaintId}`).emit('complaint:typing', {
      userName: data.userName,
    })
  })

  // Stop typing
  socket.on('complaint:stop_typing', (data: { complaintId: string }) => {
    socket.to(`complaint:${data.complaintId}`).emit('complaint:stop_typing')
  })
}