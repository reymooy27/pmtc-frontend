import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import {sideBarOpen} from '../redux/reducers/appSlice'
import {selectUser, fetchLogout} from '../redux/reducers/userSlice'
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function SideBar(props) {
const dispatch = useDispatch()
  
const user = useSelector(selectUser)
const open = useSelector(sideBarOpen)
const isAdmin = user !== null ? user.role === 'ADMIN' : null
  return (
    <nav className={open ? "side-bar active" : "side-bar"}>
      <div className="nav">
        <div className="sidebar-top">
          <Link to="/">
            <SportsEsportsIcon />
            Turnamen
          </Link>
          {isAdmin ? (
            <Link to="/admin">
              <SupervisorAccountIcon /> Admin
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-social">
            <span>Media Sosial</span>
            <div className="sidebar-social-icon">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/pubgmtc.official"
              >
                <FacebookIcon />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/pmtc.official/"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
          <div className="sidebar-contact">
            <span>Kontak</span>
            <div className="sidebar-contact-icon">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://wa.me/6282237813869"
              >
                <WhatsAppIcon />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:pmtc.official@gmail.com"
              >
                <MailOutlineIcon />
              </a>
            </div>
          </div>
          <div className="sidebar-logout">
            {user ? (
              <button onClick={() => dispatch(fetchLogout())}>
                <ExitToAppIcon /> Logout
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
