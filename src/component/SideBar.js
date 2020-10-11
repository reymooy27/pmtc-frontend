import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { StateContext } from "../StateProvider";

function SideBar(props) {
  const value = useContext(StateContext);

  return (
    <nav className={props.open ? "side-bar active" : "side-bar"}>
      <div className="nav">
        <Link to="/">Home</Link>
        {value.data_.registrationClosed ? (
          ""
        ) : (
          <Link to="/registration">Pendaftaran</Link>
        )}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://forms.gle/y7rDmdaQY55YsLLF6"
        >
          Lapor
        </a>
      </div>
    </nav>
  );
}

export default SideBar;
