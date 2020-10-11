import React, { Fragment, useContext, useEffect, useState } from "react";
import LeaderboardTeam from "./LeaderboardTeam";
import "./LeaderboardGroup.css";
import { StateContext } from "../StateProvider";

function LeaderboardGroup(props) {
  const value = useContext(StateContext);

  const [show, setShow] = useState(false);

  const [some, setSome] = useState([]);

  const click = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    const newArray = value.data.filter((team) => {
      if (team.inGroup === props.inGroup) {
        return team;
      }
      return null;
    });
    setSome(newArray);
  }, [value.data, props.inGroup]);

  return (
    <Fragment>
      <button
        onClick={click}
        className={
          show
            ? "leaderboard-group leaderboard-group-active"
            : "leaderboard-group"
        }
      >
        GRUP {props.inGroup}
      </button>
      <div
        className="leaderboard-table"
        style={{ display: show ? "block" : "none" }}
      >
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Nama Tim</td>
              <td>Total PTS</td>
              <td>Placement PTS</td>
              <td>Kill PTS</td>
            </tr>
          </thead>
          <tbody>
            {some
              .sort(
                (a, b) =>
                  b.teamPlcPoint +
                  b.teamKillPoint -
                  (a.teamPlcPoint + a.teamKillPoint)
              )
              .map((team, index) => {
                return (
                  <LeaderboardTeam
                    key={team._id}
                    id={team._id}
                    pos={index + 1}
                    logo={team.logo}
                    teamName={team.teamName}
                    teamPlcPoint={team.teamPlcPoint}
                    teamKillPoint={team.teamKillPoint}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default LeaderboardGroup;
