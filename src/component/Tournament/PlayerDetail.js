import React from "react";
import "./PlayerDetail.css";

function PlayerDetail({ name, id, kill }) {
  return (
    <div className="team-detail-player">
      <div className="team-detail-player-name">
        <span>{name}</span>
        <span> ID : {id}</span>
      </div>
      <div className="team-detail-player-details">
        <div className="team-detail-player-details-top">
          <div className="team-detail-player-detail">
            <span>Kill</span>
            <span>{kill}</span>
          </div>
          <div className="team-detail-player-detail">
            <span>Damage</span>
            <span>-</span>
          </div>
          <div className="team-detail-player-detail">
            <span>Assist</span>
            <span>-</span>
          </div>
        </div>
        <div className="team-detail-player-details-bottom">
          <div className="team-detail-player-detail">
            <span>K/D Ratio</span>
            <span>-</span>
          </div>
          <div className="team-detail-player-detail">
            <span>Knocks</span>
            <span>-</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;
