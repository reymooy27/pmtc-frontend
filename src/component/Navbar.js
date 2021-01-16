import React from "react";
import "./Navbar.css";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
import { selectUser } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSideBar } from "../redux/reducers/appSlice";
import { selectToRecipient } from "../redux/reducers/chatSlice";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, useMediaQuery } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

function Navbar({isChat, backButton}) {

  const matches = useMediaQuery('(min-width:976px)');

  const useStyles = makeStyles(() => ({
    root: {
      color: 'white',
      position: 'absolute',
      top: matches ? '5px' : '0px',
      left: matches ? '200px' : '0px',
    },
  }));
  
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const toRecipient = useSelector(selectToRecipient)

  const classes = useStyles()

  const history = useHistory()

  return (
    <div className="navbar-responsive">
      {backButton ?
      <IconButton onClick={()=> history.goBack()} className={classes.root} aria-label="send message" component="span">
        <ArrowBackIcon/>
      </IconButton> :
      <div onClick={() => dispatch(showSideBar())} className="menuicon noSelect"></div>}
      {isChat && <div className='chat-username'>{toRecipient?.username}</div>}
      {!isChat && user ? (
        <Link to={`/profile/${user._id}`}>
          <Avatar
            alt={user.username}
            src={user.profilePicture}
          />
        </Link>
      ) : (
        ""
      )}
      {user ? (
        ""
      ) : (
        // <Link to="/login">
        //   <button className="login-button">Login</button>
        // </Link>
        ""
      )}
    </div>
  );
}

export default Navbar;
