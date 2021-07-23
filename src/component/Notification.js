import React, { useEffect, useState } from 'react'
import './Notification.css'
import axios from '../axios'
import socket from '../socket.io'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import moment from 'moment'
import Skeleton from '@material-ui/lab/Skeleton';
import NeedLogin from './NeedLogin'
import { selectUser } from '../redux/reducers/userSlice'
import { useSelector } from 'react-redux'

function Notification() {

  const useStyles = makeStyles(() => ({
    root: {
      width: '60px',
      height: '60px'
    },
    skeleton:{
      backgroundColor: '#0E1013'
    }
  }))

  const classes = useStyles()

  const user = useSelector(selectUser)

  const [data, setData] = useState([])
  const [notification, setNotification] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fecthNotifications = async ()=>{
      await axios.get('/notifications')
      .then(res=> {
        setData(res.data)
        setLoading(false)
      })
      .catch(err=> {
        console.log(err)
        setLoading(true)
      })
    }
    fecthNotifications()
  }, [notification])

    useEffect(() => {
    socket.on("notification", (data) => setNotification(data === notification ? data+'1' : data));

    return ()=> socket.removeAllListeners("notification");
  }, [notification])

  const manageFriendRequest = async (a)=>{
    const accepted = a.actionType === 'Terima' ? true : false
    await axios.post(a.actionLink, {accepted: accepted})
    .then(res=> console.log(res.data))
    .catch(err=> console.log(err))
  }


  return (
    <>
      {!user ? <NeedLogin title='Notifikasi'/> : <div className='notification'>
        <h1>Notifikasi</h1>
        {(loading ? Array.from(new Array(10)) : data).map((d,i)=>(
          <div key={i}>
          <Link to={d?.link} className='notification-wraper'>
            {loading ?  
              <Skeleton className={classes.skeleton} variant="circle">
                <Avatar className={classes.root} />
              </Skeleton> : <Avatar className={classes.root} src={d?.sender?.profilePicture}/>}
            <div className='notification-detail'>
              {loading ? <Skeleton className={classes.skeleton} animation="wave" height={20} width="250px" style={{marginTop: '5px'}}/> : <p>{d?.message}</p>}
              {loading ? <Skeleton className={classes.skeleton} animation="wave" height={20} width="130px" style={{marginTop: '5px'}}/> : <p className='notification-sender'>{d?.sender?.username}</p>}
              {loading ? <Skeleton className={classes.skeleton} animation="wave" height={10} width="80px" style={{marginTop: '5px'}}/> : <p className='notification-time'>{moment(d?.createdAt).fromNow()}</p>}
            </div>
          </Link>
          {d?.action && d?.action.map(a=>(
            <span key={a?._id} className='notification-action' onClick={()=> manageFriendRequest(a)}>{a?.actionType}</span>
          ))} 
          </div>
        ))}
      </div>}
    </>
  )
}

export default Notification
