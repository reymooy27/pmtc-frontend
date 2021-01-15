import React, { useEffect, useState } from 'react'
import './Chat.css'
import axios from '../axios'
import socket from '../socket.io'
import { useParams } from 'react-router-dom'
import { selectUser } from '../redux/reducers/userSlice'
import { useSelector } from 'react-redux'
import { selectToRecipient } from '../redux/reducers/chatSlice'

function Chat() {

  const user = useSelector(selectUser)
  const toRecipient = useSelector(selectToRecipient)

  const [sentMessage, setSentMessage] = useState('')
  const [conversation, setConversation] = useState(null)
  const [newConversation, setNewConversation] = useState('')

  const {id} = useParams()

  useEffect(() => {
    const getConversation = async ()=>{
      await axios.post(`/chats/${id}`)
      .then(res=>{
        setConversation(res.data)
      })
      .catch(err=> console.log(err))
    }
    getConversation()
  }, [newConversation,id])

  useEffect(() => {
    socket.on("sendMessage", (data) => setNewConversation(data));
  }, [])

  const sendMessage = async ()=>{
    await axios.post(`/chat/${toRecipient}`, {message: sentMessage})
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=> console.log(err))
  }

  return (
    <div className='chat'>
      <h1>Chat</h1>
      {conversation && conversation.map(c=>(
        <p className={user?._id === c.from ? 'chat-user-message' : 'chat-message'} key={c._id}>{c.message}</p>
      ))}
      <input type='text' value={sentMessage} onChange={(e)=> setSentMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat
