import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TeamList.css";

function TeamList(props) {
  const [show, setShow] = useState(false);

  const click = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div className="team-list-wraper">
      <div
        onClick={click}
        className={show ? "team-list team-list-active " : "team-list"}
      >
        <Link to={`/team/${props.id}`}>
          <div className="logo-team">
            <img src={props.logo} alt="" />
          </div>
          <div className="team-name">
            {props.teamName}
            <span>({props.abbr})</span>
          </div>
        </Link>
      </div>
      <div style={{ display: show ? "block" : "none" }} className="list">
        <ul>
          <li>
            {props.playerName1} <span>({props.idPlayer1})</span>
          </li>
          <li>
            {props.playerName2} <span>({props.idPlayer2})</span>
          </li>
          <li>
            {props.playerName3} <span>({props.idPlayer3})</span>
          </li>
          <li>
            {props.playerName4} <span>({props.idPlayer4})</span>
          </li>
          {props.idPlayer5 ? (
            <li>
              {props.playerName5} <span>({props.idPlayer5})</span>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}

export default TeamList;
