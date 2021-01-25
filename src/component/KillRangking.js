import React, { Fragment, useEffect, useState } from "react";
import "./KillRangking.css";
import { Link } from "react-router-dom";
import {selectTournament} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";
import socket from '../socket.io'

function KillRangking() {
  const tournament = useSelector(selectTournament)

  document.title = `${tournament?.tournamentName} - Kill Rangking`

  const [teamUpdated, setTeamUpdated] = useState('')

  function sortTable() {
    var table, i, x, y;
    table = document.getElementById("kill-rangking-table");
    var switching = true;

    while (switching) {
      switching = false;
      var rows = table.rows;

      for (i = 1; i < rows.length - 1; i++) {
        var Switch = false;

        x = rows[i].getElementsByClassName("tot-kill")[0];
        y = rows[i + 1].getElementsByClassName("tot-kill")[0];
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          Switch = true;
          break;
        }
      }
      if (Switch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  function pos() {
    let pos = document.getElementsByClassName(`pos`);
    for (let i = 0; i < pos.length; i++) {
      pos[i].innerHTML = i + 1;
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted && tournament.showKillStanding && tournament.teams.length >= 1 ) {
      sortTable();
      pos();
    }
    return () => (mounted = false);
  }, [teamUpdated, tournament.showKillStanding,tournament.teams.length]);

  useEffect(() => {
    socket.on("updateTeam", (data) => setTeamUpdated(data === teamUpdated ? data+'1' : data));

    return ()=> socket.removeAllListeners("updateTeam");
  }, [teamUpdated])

  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Kill Rangking</h4>
      </div>
      {tournament.showKillStanding && tournament.teams.length >= 1 ? (
        <div className="kill-rangking">
          <table id="kill-rangking-table">
            <thead>
              <tr>
                <td>#</td>
                <td>Nama Pemain</td>
                <td>Total Kill</td>
              </tr>
            </thead>
            <tbody>
              {tournament.teams.map((player, index) => (
                <Fragment key={player._id}>
                  <tr>
                    <td className="pos">{index + 1}</td>
                    <td className="kill-rank">
                      <Link to={`/tournament/${tournament._id}/team/${player._id}`}>
                        <div className="kill-player-team-logo">
                          <img src={player.logo} alt="" />
                        </div>
                        <div className="kill-player-name">
                          {player.playerName}
                        </div>
                      </Link>
                    </td>
                    <td className="tot-kill">{player.playerKill}</td>
                  </tr>
                  <tr>
                    <td className="pos">{index + 1}</td>
                    <td className="kill-rank">
                      <Link to={`/tournament/${tournament._id}/team/${player._id}`}>
                        <div className="kill-player-team-logo">
                          <img src={player.logo} alt="" />
                        </div>
                        <div className="kill-player-name">
                          {player.playerName2}
                        </div>
                      </Link>
                    </td>
                    <td className="tot-kill">{player.player2Kill}</td>
                  </tr>
                  <tr>
                    <td className="pos">{index + 1}</td>
                    <td className="kill-rank">
                      <Link to={`/tournament/${tournament._id}/team/${player._id}`}>
                        <div className="kill-player-team-logo">
                          <img src={player.logo} alt="" />
                        </div>
                        <div className="kill-player-name">
                          {player.playerName3}
                        </div>
                      </Link>
                    </td>
                    <td className="tot-kill">{player.player3Kill}</td>
                  </tr>
                  <tr>
                    <td className="pos">{index + 1}</td>
                    <td className="kill-rank">
                      <Link to={`/tournament/${tournament._id}/team/${player._id}`}>
                        <div className="kill-player-team-logo">
                          <img src={player.logo} alt="" />
                        </div>
                        <div className="kill-player-name">
                          {player.playerName4}
                        </div>
                      </Link>
                    </td>
                    <td className="tot-kill">{player.player4Kill}</td>
                  </tr>
                  {player.playerName5 ? (
                    <tr>
                      <td className="pos">{index + 1}</td>
                      <td className="kill-rank">
                        <Link to={`/tournament/${tournament._id}/team/${player._id}`}>
                          <div className="kill-player-team-logo">
                            <img src={player.logo} alt="" />
                          </div>
                          <div className="kill-player-name">
                            {player.playerName5}
                          </div>
                        </Link>
                      </td>
                      <td className="tot-kill">{player.player5Kill}</td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-participant">
          <h3>Belum Tersedia Saat Ini</h3>
        </div>
      )}
    </div>
  );
}

export default KillRangking;
