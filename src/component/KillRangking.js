import React, { Fragment, useContext, useEffect } from "react";
import "./KillRangking.css";
import { StateContext } from "../StateProvider";
import { Link } from "react-router-dom";

function KillRangking() {
  const value = useContext(StateContext);

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
    if (mounted && value.data_.showKillStanding) {
      sortTable();
      pos();
    }
    return () => (mounted = false);
  }, [value.data_.showKillStanding]);

  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Kill Rangking</h4>
      </div>
      {value.data_.showKillStanding ? (
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
              {value.data.map((player, index) => (
                <Fragment key={player._id}>
                  <tr>
                    <td className="pos">{index + 1}</td>
                    <td className="kill-rank">
                      <Link to={`/team/teamdetail/${player._id}`}>
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
                      <Link to={`/team/teamdetail/${player._id}`}>
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
                      <Link to={`/team/teamdetail/${player._id}`}>
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
                      <Link to={`/team/teamdetail/${player._id}`}>
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
                        <Link to={`/team/teamdetail/${player._id}`}>
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
