import { IconButton, makeStyles } from '@material-ui/core'
import { ChatOutlined, HomeOutlined, NotificationsOutlined, PersonOutline, SearchOutlined } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/reducers/userSlice';
import './FooterMenu.css'

function FooterMenu() {

  const useStyles = makeStyles(() => ({
  color: {
    color: 'white',
    fontSize: '2rem'
  }
}));

const user = useSelector(selectUser)

  const classes = useStyles()
  
  return (
    <div className='footer--menu'>
      <Link to='/'>
        <IconButton className={classes.color}>
          <SearchOutlined/>
        </IconButton>
      </Link>
      <Link to='/notification'>
        <IconButton className={classes.color}>
          <NotificationsOutlined/>
        </IconButton>
      </Link>
      <Link to='/'>
        <IconButton className={classes.color}>
          <HomeOutlined/>
        </IconButton>
      </Link>
      <Link to='/chat'>
        <IconButton className={classes.color}>
          <ChatOutlined/>
        </IconButton>
      </Link>
      <Link to={`/profile/${user?._id}`}>
        <IconButton className={classes.color}>
          <PersonOutline/>
        </IconButton>
      </Link>
    </div>
  )
}

export default FooterMenu
