import io from 'socket.io-client'
const baseURL = process.env.NODE_ENV === 'production' ? "https://pmtc-tourney.herokuapp.com" : "http://localhost:8000"

const socket = io(baseURL,{withCredentials: true})
export default socket