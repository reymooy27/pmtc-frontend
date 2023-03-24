import io from 'socket.io-client'
const baseURL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : "http://localhost:8000"

const socket = io(baseURL,
  {
  withCredentials: true,
  transports: ['websocket'],
  secure: true,
})
export default socket