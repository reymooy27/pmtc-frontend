import React, { Fragment, useEffect, useState } from "react";
import LeaderboardTeam from "./LeaderboardTeam";
import "./LeaderboardGroup.css";
import {selectTournament} from '../../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";

function GrandfinalGroup(props) {
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
    const grandfinalArray = tournament.teams.filter((team) => {
      if (team.qualifyToGrandFinal) {
        return team;
      }
      return null;
    });
    setSome(grandfinalArray);
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
        GRANDFINAL
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
                  b.GFteamPlcPoint +
                  b.GFteamKillPoint -
                  (a.GFteamPlcPoint + a.GFteamKillPoint)
              )
              .map((team, index) => {
                return (
                  <LeaderboardTeam
                    key={team._id}
                    id={team._id}
                    pos={index + 1}
                    logo={team.logo}
                    teamName={team.teamName}
                    teamPlcPoint={team.GFteamPlcPoint}
                    teamKillPoint={team.GFteamKillPoint}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default GrandfinalGroup;
