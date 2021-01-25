import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import axios from '../axios'
import socket from '../socket.io'
import { useParams } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {setToRecipient } from '../redux/reducers/chatSlice'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

function Chat() {

  document.title = `Chat`

  const [sentMessage, setSentMessage] = useState('')
  const [conversation, setConversation] = useState(null)
  const [newConversation, setNewConversation] = useState('')

  const {id} = useParams()

  const chatBottom = useRef(null)

  const dispatch = useDispatch()

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getConversation = async ()=>{
      await axios.get(`/chats/${id}`)
      .then(res=>{
        setConversation(res.data)
        scrollToBottom()
      })
      .catch(err=> console.log(err))
    }
    getConversation()
  }, [newConversation,id])

  useEffect(() => {
    socket.on("sendMessage", (data) => setNewConversation(data === newConversation ? data+'1' : data));

    return ()=> socket.removeAllListeners("sendMessage");
  }, [newConversation])

  useEffect(() => {
    const getRecipientDetails = async ()=>{
      await axios.get(`/user/${id}`)
      .then(res=> dispatch(setToRecipient(res.data)))
      .catch(err=> console.log(err))
    }
    getRecipientDetails()
  }, [dispatch,id])

  const sendMessage = async ()=>{
    await axios.post(`/chat/${id}`, {message: sentMessage})
    .then(res=>{
      setSentMessage('')
    })
    .catch(err=> {
      console.log(err)
      setSentMessage('')
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [newConversation])

  return (
    <div className='chat'>
      <div className='chat-messages-wraper'>
        {conversation && conversation.map(c=>(
          <p className={id === c.to ? 'chat-message byUser' : 'chat-message bySender'} key={c._id}>{c.message}</p>
        ))}
      </div>
      <div ref={chatBottom}/>
      <div className='chat-send-message'>
        <input type='text' autoFocus value={sentMessage} onChange={(e)=> setSentMessage(e.target.value)}/>
        <IconButton onClick={sendMessage} disabled={sentMessage === '' ? true : false} aria-label="send message" component="span">
          <SendIcon style={sentMessage === '' ? {color: '#0e1013', fontSize: '32px'} : {color: '#00dbae', fontSize: '32px'} } />
        </IconButton>
        {/* <button onClick={sendMessage}>Send</button> */}
      </div>
    </div>
  )
}

export default Chat
