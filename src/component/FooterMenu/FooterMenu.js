import { IconButton, makeStyles } from '@material-ui/core'
import { IoNotificationsOutline,IoPersonOutline,IoHomeOutline,IoSearchOutline,IoChatboxOutline } from 'react-icons/io5';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/userSlice';
import './FooterMenu.css'

function FooterMenu(props) {

  const useStyles = makeStyles(() => ({
  color: {
    color: 'white',
    fontSize: '2rem',
    '& svg':{
      fontSize: '24px'
    }
  },
}));

  const user = useSelector(selectUser)

  const hidden = props.location.pathname.includes('/chat/') ? true : false

  const classes = useStyles()
  
  return (
    <>
    {!hidden && <div className='footer--menu'>
      <Link to='/search'>
        <IconButton className={classes.color}>
          <IoSearchOutline/>
        </IconButton>
      </Link>
      <Link to='/notification'>
        <IconButton className={classes.color}>
          <IoNotificationsOutline/>
        </IconButton>
      </Link>
      <Link to='/'>
        <IconButton className={classes.color}>
          <IoHomeOutline/>
        </IconButton>
      </Link>
      <Link to='/chat'>
        <IconButton className={classes.color}>
          <IoChatboxOutline/>
        </IconButton>
      </Link>
      {user && <Link to={`/profile/${user?._id}`}>
        <IconButton className={classes.color}>
          <IoPersonOutline/>
        </IconButton>
      </Link>}
    </div>}
  </>
  )
}

export default FooterMenu
