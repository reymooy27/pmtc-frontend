import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../../redux/reducers/userSlice'
import axios from '../../axios'
import './ChatList.css'
import { setToRecipient } from '../../redux/reducers/chatSlice'
import { Avatar } from '@material-ui/core'
import socket from '../../socket.io'
import moment from 'moment'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import NeedLogin from '../NeedLogin/NeedLogin'

function ChatList() {

    const useStyles = makeStyles(() => ({
    skeleton:{
      backgroundColor: '#0E1013'
    }
  }))

  const classes = useStyles()
  
  document.title = `Chat`

  const user = useSelector(selectUser)

  const [chatList, setChatList] = useState([])
  const [newChatList, setNewChatList] = useState([])
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    let mounted = true
    const getChatList = async ()=>{
      await axios.get('/chatList')
      .then(res=> {
        if(mounted){
          setChatList(res.data)
          setLoading(false)
        }}
      )
      .catch(err=> {
        console.log(err)
        setLoading(true)
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
    for (let i = 0; i < recipients?.length; i++) {
      if (
        recipients[i]?._id !== user?._id
      ) {
        return recipients[i];
      }
    }
    return null;
  };

  return (
    <>
      {!user ? <NeedLogin title='Pesan'/> : <div className='chatList'>
        <h1>Pesan</h1>
        {(loading ? Array.from(new Array(10)) : chatList).map((cl,i)=>(
          <Link className='chatList-chat' 
                onClick={()=> dispatch(setToRecipient(handleRecipient(cl?.recipients)))} 
                key={i} 
                to={loading ? '/chat' :`/chat/${handleRecipient(cl?.recipients)?._id}`}>
            <div className='chatList-chat-avatar'>
              {loading ? 
              <Skeleton className={classes.skeleton} variant="circle">
                <Avatar />
              </Skeleton> : <Avatar src={handleRecipient(cl?.recipients)?.profilePicture} alt=''/>}
            </div>
            <div className='chatList-chat-recipient'>
              {loading ? <Skeleton className={classes.skeleton} animation="wave" height={20} width="200px" style={{marginTop: '10px'}}/> : <h4>{handleRecipient(cl?.recipients)?.username}</h4>}
              {loading ? <Skeleton className={classes.skeleton} animation="wave" height={10} width="150px" style={{marginTop: '5px'}}/> : <span>{cl?.lastMessage?.length > 10 ? cl?.lastMessage.substring(0,20) + '...' : cl?.lastMessage}</span>}
              {loading ? <Skeleton className={classes.skeleton} animation="wave" height={10} width="50px" style={{marginTop: '5px',position: 'absolute',right: '5px', bottom: '2px'}}/> : <p className='chatList-time'>{moment(cl?.updatedAt).fromNow()}</p>}
            </div>
          </Link>
        ))
        }
      </div>}
    </>
  )
}

export default ChatList
