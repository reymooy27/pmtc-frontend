import React from "react";
import "./TournamentDetail.css";
function TournamentDetail(props) {
  return (
    <div className="tournament-detail">
      <h5>{props.title}</h5>
      <span>{props.detail}</span>
    </div>
  );
}

export default TournamentDetail;
