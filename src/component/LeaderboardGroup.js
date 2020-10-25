import React, { Fragment, useEffect, useState } from "react";
import LeaderboardTeam from "./LeaderboardTeam";
import "./LeaderboardGroup.css";
import {selectTournament} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";

function LeaderboardGroup(props) {
  const tournament = useSelector(selectTournament)

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
    const newArray = tournament.teams.filter((team) => {
      if (team.inGroup === props.inGroup) {
        return team;
      }
      return null;
    });
    setSome(newArray);
  }, [tournament.teams, props.inGroup]);

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
