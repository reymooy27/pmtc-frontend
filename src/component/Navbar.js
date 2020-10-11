import React from "react";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar-responsive">
      <div onClick={props.onClick} className="menuicon"></div>
    </div>
  );
}

export default Navbar;
