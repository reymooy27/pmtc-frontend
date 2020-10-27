import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./LeaderboardTeam.css";

function LeaderboardTeam(props) {
  return (
    <Fragment>
      <tr>
        <td>{props.pos}</td>
        <td className="leaderboard-team-rank">
          <Link to={`/team/${props.id}`}>
            <div className="leaderboard-team-logo">
              <img src={props.logo} alt="" />
            </div>
            <div className="leaderboard-team-name">{props.teamName}</div>
          </Link>
        </td>
        <td>{props.teamPlcPoint + props.teamKillPoint}</td>
        <td>{props.teamPlcPoint}</td>
        <td>{props.teamKillPoint}</td>
      </tr>
    </Fragment>
  );
}

export default LeaderboardTeam;
