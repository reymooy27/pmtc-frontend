import React, { useEffect, useState } from 'react'
import './Notification.css'
import axios from '../axios'
import socket from '../socket.io'
import { Avatar } from '@material-ui/core'

function Notification() {

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
        <div key={d._id}>
          {d.sender && <Avatar src={d.sender.profilePicture}/>}
          {d.sender && <p>{d.sender.username}</p>}
          <p>{d.message}</p>
          <p>{d.createdAt}</p>
        </div>
      ))}
    </div>
  )
}

export default Notification
