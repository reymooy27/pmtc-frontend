import React from "react";
import "./Navbar.css";
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import {selectUser} from '../redux/reducers/userSlice'
import { useSelector } from "react-redux";

function Navbar(props) {
  
  const user = useSelector(selectUser)
  
return (
    <div className="navbar-responsive">
      <div onClick={props.onClick} className="menuicon"></div>
      {user ? <Link to='/profile'><Avatar alt={user.username} src={user.profilePicture} className='avatar'/></Link> : ''}
      {/* {user ? '' : <Link to='/login'><button className='login-button'>Login</button></Link>} */}
    </div>
  );
}

export default Navbar;
