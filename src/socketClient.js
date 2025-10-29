// Cấu hình socket.io client và export ra biến socketIoInstance
// https://socket.io/how-to/use-with-react
import { io } from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'

// Socket.IO client configuration cho production deployment
export const socketIoInstance = io(API_ROOT, {
  // Sử dụng websocket transport để tránh polling issues trên Render
  transports: ['websocket', 'polling'],

  // Enable credentials để gửi cookies
  withCredentials: true,

  // Tăng timeout cho Render free tier (server có thể sleep)
  timeout: 20000,

  // Auto-reconnect settings
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
})