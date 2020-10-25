import React, { Fragment, useEffect, useState } from "react";
import "./TeamDetail.css";
import axios from "../axios";
import Loader from "react-loader-spinner";
import PlayerDetail from "./PlayerDetail";

function TeamDetail() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const i = document.URL.match("teamdetail").index;
    let mounted = true;
    async function fetchData() {
      const req = await axios.post(`/team/${document.URL.slice(i + 11)}`);
      if (mounted) {
        setData(req.data);
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        />
      ) : (
        <Fragment>
          <div className="team-detail">
            <div className="team-detail-identity">
              <img className="team-detail-logo" src={data.logo} alt="" />
              <p className="team-detail-team-name">{data.teamName}</p>
            </div>
            <div className="team-detail-info">
              <div>
                <span>Kill</span>
                <span>{data.teamKillPoint}</span>
              </div>
              <div>
                <span>Placement</span>
                <span>{data.teamPlcPoint}</span>
              </div>
              <div>
                <span>Damage</span>
                <span>-</span>
              </div>
            </div>
          </div>
          <h2 className='team-detail-roster-title'>Roster</h2>
          <div className="team-detail-roster">
            <PlayerDetail
              name={data.playerName}
              id={data.idPlayer}
              kill={data.playerKill}
            />
            <PlayerDetail
              name={data.playerName2}
              id={data.idPlayer2}
              kill={data.player2Kill}
            />
            <PlayerDetail
              name={data.playerName3}
              id={data.idPlayer3}
              kill={data.player3Kill}
            />
            <PlayerDetail
              name={data.playerName4}
              id={data.idPlayer4}
              kill={data.player4Kill}
            />
            {data.idPlayer5 ? (
              <PlayerDetail
                name={data.playerName5}
                id={data.idPlayer5}
                kill={data.player5Kill}
              />
            ) : (
              ""
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default TeamDetail;
