import React, { useEffect, useState } from 'react'
import './Notification.css'
import axios from '../axios'
import socket from '../socket.io'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import moment from 'moment'
import Navbar from './Navbar'
import SideBar from './SideBar'
import { closeSideBar } from '../redux/reducers/appSlice'
import { useDispatch } from 'react-redux'
import FooterMenu from './FooterMenu'

function Notification() {

  const useStyles = makeStyles(() => ({
    root: {
      width: '60px',
      height: '60px'
    },
  }))

  const classes = useStyles()

  const dispatch = useDispatch()

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

  const manageFriendRequest = async (a)=>{
    const accepted = a.actionType === 'Terima' ? true : false
    await axios.post(a.actionLink, {accepted: accepted})
    .then(res=> console.log(res.data))
    .catch(err=> console.log(err))
  }


  return (
    <>
      <Navbar backButton={true}/>
      <SideBar/>
      <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
        <div className='notification'>
          <h1>Notifikasi</h1>
          <br></br>
          {data.map(d=>(
            <div key={d._id}>
            <Link to={d.link} className='notification-wraper'>
              <Avatar className={classes.root} src={d.sender?.profilePicture}/>
              <div className='notification-detail'>
                <p>{d.message}</p>
                {d.sender && <p className='notification-sender'>{d.sender.username}</p>}
                <p className='notification-time'>{moment(d.createdAt).fromNow()}</p>
              </div>
            </Link>
            {d.action && d.action.map(a=>(
              <span key={a._id} className='notification-action' onClick={()=> manageFriendRequest(a)}>{a.actionType}</span>
            ))} 
            </div>
          ))}
        </div>
      </div>
      <FooterMenu/>
    </>
  )
}

export default Notification
