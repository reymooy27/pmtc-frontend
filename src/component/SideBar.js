import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import {sideBarOpen} from '../redux/reducers/appSlice'
import {selectUser,logout} from '../redux/reducers/userSlice'
import { useDispatch, useSelector } from "react-redux";


function SideBar(props) {
const dispatch = useDispatch()
  
const user = useSelector(selectUser)
const open = useSelector(sideBarOpen)

  return (
    <nav className={open ? "side-bar active" : "side-bar"}>
      <div className="nav">
        <div className='sidebar-top'>
          <Link to="/">Turnamen</Link>
         {user ? <Link to="/admin">Admin</Link> : ''}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://forms.gle/y7rDmdaQY55YsLLF6"
        >
          Lapor
        </a>
        </div>
        <div className='sidebar-bottom'>
        {user ? <button onClick={()=> dispatch(logout())}>Logout</button> : ''}
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
