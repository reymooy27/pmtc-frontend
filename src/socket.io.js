import io from 'socket.io-client'
const baseURL = 'https://pubg.up.railway.app/'

const socket = io(baseURL,
  {
  withCredentials: true,
  transports: ['websocket'],
  secure: true,
})
export default socket