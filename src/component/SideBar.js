import React from "react";
import { Link} from "react-router-dom";
import "./SideBar.css";
import {closeSideBar, sideBarOpen} from '../redux/reducers/appSlice'
import {selectUser} from '../redux/reducers/userSlice'
import {useDispatch, useSelector } from "react-redux";

import NotificationsIcon from '@material-ui/icons/Notifications';
import {Facebook, 
  Twitter, 
  Instagram, 
  YouTube,
  PersonOutline,
  Search,
  Group,
  Chat,
  SportsEsports,
  Favorite,
  Assignment,
  Subscriptions,
  Help,
  ConfirmationNumber,
  PermDataSetting,
  AccountBalanceWallet,
  Score,
  ImageAspectRatio,
} from '@material-ui/icons';

function SideBar(props) {
  
const user = useSelector(selectUser)
const open = useSelector(sideBarOpen)

const dispatch = useDispatch()

const handleClose = ()=>{
  dispatch(closeSideBar())
}

  return (
    <div className={open ? 'sidebar active' : 'sidebar'}>
        <div className='sidebar--logo'>
          <h3>Game Portal</h3>
        </div>
        <div className='sidebar--menu'>
          {user && <Link onClick={handleClose} to={`/profile/${user?._id}`}><PersonOutline/> Profile</Link>}
          <Link onClick={handleClose} to='/'><Search/> Search</Link>
          {user && <Link onClick={handleClose} to={`/profile/${user?._id}/friends`}><Group/> Friends</Link>}
          {user && <Link onClick={handleClose} to='/chat'><Chat/> Messages</Link>}
          {user && <Link onClick={handleClose} to='/notification'><NotificationsIcon/> Notification</Link>}
          {user && <Link onClick={handleClose} to='/admin'><ImageAspectRatio/> Admin</Link>}
          <Link onClick={handleClose} to='/'><Score/> Score</Link>
          <Link onClick={handleClose} to='/'><Assignment/>Tasks</Link>
          <Link onClick={handleClose} to='/'><Favorite/> Favorite</Link>
          <Link onClick={handleClose} to='/'><SportsEsports/> League</Link>
          <Link onClick={handleClose} to='/'><AccountBalanceWallet/> Balance</Link>
          <Link onClick={handleClose} to='/'><Subscriptions/> Suggestions</Link>
        </div>
        <div className='sidebar--social'>
          <Twitter/>
          <Facebook/>
          <Instagram/>
          <Twitter/>
          <YouTube/>
          <Facebook/>
        </div>
        <div className='sidebar--help'>
          <Link onClick={handleClose} to='/'><Help/> Help</Link>
          <Link onClick={handleClose} to='/'><ConfirmationNumber/> Conditions</Link>
          <Link onClick={handleClose} to='/'><PermDataSetting/> Confidentialy</Link>
        </div>
      </div>
  );
}

export default SideBar;
