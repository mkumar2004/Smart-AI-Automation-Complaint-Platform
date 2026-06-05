import { Socket } from 'socket.io'

export const registerAgentHandlers = (socket: Socket): void => {

  // Agent sets their availability status
  socket.on('agent:status', (data: { status: 'online' | 'busy' | 'away' }) => {
    socket.data.agentStatus = data.status
    // Notify admins of agent status change
    socket.to('admins').emit('agent:status_changed', {
      agentId: socket.data.userId,
      status: data.status,
    })
    console.log(`🧑‍💼 Agent ${socket.data.userId} is now: ${data.status}`)
  })
}