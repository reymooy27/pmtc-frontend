import React, { useState } from "react";
import "./Navbar.css";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
import { fetchLogout, selectUser } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSideBar } from "../redux/reducers/appSlice";
import { selectToRecipient } from "../redux/reducers/chatSlice";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton, Menu, MenuItem, useMediaQuery } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function Navbar({isChat, backButton}) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const matches = useMediaQuery('(min-width:976px)');

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
            color: 'white'
          },
          backgroundColor: '#2C2E3C',
          color: 'white'
        }
      }
    }
  }));
  
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const toRecipient = useSelector(selectToRecipient)

  const classes = useStyles()

  const history = useHistory()

  return (
    <div className="navbar-responsive">
      <div className='search-input-wraper'>
        <input className='search-input' type='text' placeholder='Search'/>
      </div>
      {backButton && !matches ?
      <IconButton onClick={()=> history.goBack()} className={classes.root} aria-label="send message" component="span">
        <ArrowBackIcon/>
      </IconButton> :
      <div onClick={() => dispatch(showSideBar())} className="menuicon noSelect"></div>}
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to='/'>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <MenuItem onClick={()=> dispatch(fetchLogout())}>Logout</MenuItem>
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
