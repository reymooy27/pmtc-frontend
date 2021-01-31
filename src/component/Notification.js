import React, { useEffect, useState } from 'react'
import './Notification.css'
import axios from '../axios'
import socket from '../socket.io'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import moment from 'moment'

function Notification() {

  const useStyles = makeStyles(() => ({
    root: {
      width: '60px',
      height: '60px'
    },
  }))

  const classes = useStyles()


  const [data, setData] = useState([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const fecthNotifications = async ()=>{
      await axios.get('/notifications')
      .then(res=> {
        setData(res.data)
        console.log(res.data)
      })
      .catch(err=> console.log(err))
    }
    fecthNotifications()
  }, [notification])

    useEffect(() => {
    socket.on("notification", (data) => setNotification(data === notification ? data+'1' : data));

    return ()=> socket.removeAllListeners("notification");
  }, [notification])

  return (
    <div className='notification'>
      <h1>Notifikasi</h1>
      <br></br>
      {data.map(d=>(
        <Link to='/' className='notification-wraper' key={d._id}>
          <Avatar className={classes.root} src={d.sender?.profilePicture}/>
          <div className='notification-detail'>
            <p>{d.message}</p>
            {d.sender && <p className='notification-sender'>{d.sender.username}</p>}
            <p className='notification-time'>{moment(d.createdAt).fromNow()}</p>  
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Notification
