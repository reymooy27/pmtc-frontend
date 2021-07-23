import React, { useState } from "react";
import "./Navbar.css";
import Avatar from "@material-ui/core/Avatar";
import { Link, Redirect, useHistory } from "react-router-dom";
import { fetchLogout, selectUser } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setSearchInput, showSideBar } from "../redux/reducers/appSlice";
import { selectToRecipient } from "../redux/reducers/chatSlice";
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem, useMediaQuery } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {IoMenuOutline,IoChatboxOutline,IoNotificationsOutline,IoArrowBackOutline,IoLogOutOutline,IoTrophyOutline,IoSettingsOutline,IoPeopleOutline,IoPersonOutline} from 'react-icons/io5'

function Navbar(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const input = useSelector(selectSearchInput);
  const toRecipient = useSelector(selectToRecipient)

  const isHome = props.location.pathname === '/' ? true : false
  const isChat = props.location.pathname.includes('/chat/') ? true : false

  const matches = useMediaQuery('(min-width: 1024px)');

  const useStyles = makeStyles(() => ({
    root: {
      color: 'white',
      position: 'absolute',
      top: matches ? '5px' : '0px',
      left: matches ? '200px' : '0px',
    },
    margin:{
      marginRight: '10px'
    },
    list:{
      '& div':{
        backgroundColor: 'transparent',
        '& ul':{
          '& a':{
            textDecoration: 'none',
            color: 'white',
          },
          minWidth: '180px',
          backgroundColor: '#2C2E3C',
          color: 'white'
        }
      }
    },
    itemIcon:{
      minWidth: 0,
      marginRight: '10px',
      color: 'white',
      '& svg':{
        fontSize: '18px',
      }
    },
    itemText:{
      '& span':{
        fontSize: '14px',
        fontWeight: 'normal',
        fontFamily: 'Open Sans',
      }
    },
    notifchat:{
      color: 'white'
    }
  }));

  const classes = useStyles()

  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e)=>{
    dispatch(setSearchInput(e.target.value))
  }

  const handleClickInput = ()=>{
    if(input !== ''){
      console.log('click')
      return (<Redirect to='/search'/>)
    } 
  }

  return (
    <div className="navbar-responsive">
      {!isChat && 
      <div className='search-input-wraper'>
        <input className='search-input' type='text' placeholder='Search' value={input} onClick={handleClickInput} onChange={handleChange}/>
        {user && <>
          <Link to='/notification'>
            <IconButton className={classes.notifchat} aria-label="notification" component="span">
              <IoNotificationsOutline/>
            </IconButton> 
          </Link>
          <Link to='/chat'>
            <IconButton className={classes.notifchat} aria-label="chat" component="span">
              <IoChatboxOutline/>
            </IconButton> 
          </Link>
        </>}
      </div>}
      {!isHome && !matches ?
        <IconButton onClick={()=> history.goBack()} className={classes.root} aria-label="go back" component="span">
          <IoArrowBackOutline/>
        </IconButton> 
        :
        <IconButton onClick={() => dispatch(showSideBar())} className={classes.root} aria-label="menu" component="span">
          <IoMenuOutline/>
        </IconButton>
      }
      {isChat && <div className='chat-username'>{toRecipient?.username}</div>}
      {!isChat && user ? (
        <>
          <Avatar className={classes.margin} onClick={handleClick}
            alt={user.username}
            src={user.profilePicture}
          />
            <Menu
              className={classes.list}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to={`/profile/${user?._id}`}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon className={classes.itemIcon}>
                    <IoPersonOutline/>
                  </ListItemIcon>
                  <ListItemText className={classes.itemText} primary="Profile" />
                </MenuItem>
              </Link>
              <Link to={`/profile/setting`}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon className={classes.itemIcon}>
                    <IoSettingsOutline/>
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </MenuItem>
              </Link>
              <Link to={`/profile/${user?._id}/friends`}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon className={classes.itemIcon}>
                    <IoPeopleOutline/>
                  </ListItemIcon>
                  <ListItemText primary="Friends" />
                </MenuItem>
              </Link>
              <Link to={`/profile/${user?._id}/team`}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon className={classes.itemIcon}>
                    <IoPeopleOutline/>
                  </ListItemIcon>
                  <ListItemText primary="Team" />
                </MenuItem>
              </Link>
              <Link to={`/profile/${user?._id}/tournaments`}>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon className={classes.itemIcon}>
                    <IoTrophyOutline/>
                  </ListItemIcon>
                  <ListItemText primary="Tournaments" />
                </MenuItem>
              </Link>
                <MenuItem onClick={()=> dispatch(fetchLogout())}>
                  <ListItemIcon className={classes.itemIcon}>
                    <IoLogOutOutline/>
                  </ListItemIcon>
                  <ListItemText primary="Log Out" />
                </MenuItem>
          </Menu>
      </>
      ) : (
        ""
      )}
      {user ? (
        ""
      ) : (
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
