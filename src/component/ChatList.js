import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../redux/reducers/userSlice'
import axios from '../axios'
import './ChatList.css'
import { setToRecipient } from '../redux/reducers/chatSlice'

function ChatList() {

  const user = useSelector(selectUser)

  const [chatList, setChatList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const getChatList = async ()=>{
      await axios.post('/chatList')
      .then(res=> setChatList(res.data))
      .catch(err=> console.log(err))
    }
    getChatList()
  }, [])

  console.log(chatList);

  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (
        recipients[i]._id !== user._id
      ) {
        return recipients[i]._id;
      }
    }
    return null;
  };

  return (
    <div className='chatList'>
      <h1>Chat List</h1>
      {chatList && chatList.map(cl=>(
        <Link onClick={()=> dispatch(setToRecipient(handleRecipient(cl.recipients)))} key={cl._id} to={`/chat/${cl._id}`}>
          {cl._id}
        </Link>
      ))}
    </div>
  )
}

export default ChatList
