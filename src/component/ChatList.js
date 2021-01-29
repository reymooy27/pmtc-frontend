import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../redux/reducers/userSlice'
import axios from '../axios'
import './ChatList.css'
import { setToRecipient } from '../redux/reducers/chatSlice'
import { Avatar } from '@material-ui/core'
import socket from '../socket.io'
import { setOpenErrorSnackbar,setErrorMessage } from '../redux/reducers/appSlice'

function ChatList() {

  document.title = `Chat`

  const user = useSelector(selectUser)

  const [chatList, setChatList] = useState([])
  const [newChatList, setNewChatList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    const getChatList = async ()=>{
      await axios.get('/chatList')
      .then(res=> {
        if(mounted){
          setChatList(res.data)
        }}
      )
      .catch(err=> {
        console.log(err)
        dispatch(setOpenErrorSnackbar(true))
        dispatch(setErrorMessage(err.response.data))
      })
    }
    getChatList()

    return ()=> mounted = false
  }, [newChatList,dispatch])

  useEffect(() => {
    socket.on("sendMessage", (data) => setNewChatList(data));

    return ()=> socket.removeAllListeners("sendMessage");
  }, [])


  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (
        recipients[i]._id !== user?._id
      ) {
        return recipients[i];
      }
    }
    return null;
  };

  return (
    <div className='chatList'>
      {chatList.length > 0 ? chatList.map(cl=>(
        <Link className='chatList-chat' onClick={()=> dispatch(setToRecipient(handleRecipient(cl.recipients)))} key={cl._id} to={`/chat/${handleRecipient(cl.recipients)._id}`}>
          <div className='chatList-chat-avatar'>
            <Avatar src={handleRecipient(cl.recipients).profilePicture} alt=''/>
          </div>
          <div className='chatList-chat-recipient'>
            <h4>{handleRecipient(cl.recipients).username}</h4>
            <span>{cl.lastMessage.length > 10 ? cl.lastMessage.substring(0,20) + '...' : cl.lastMessage}</span>
          </div>
        </Link>
      )) : 
      <h3>Belum ada pesan apapun</h3>
      }
    </div>
  )
}

export default ChatList
