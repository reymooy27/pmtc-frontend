import React from "react";
import { Link } from "react-router-dom";
import "./PrizeDetail.css";

function PrizeDetail({ id, position, image, winnerTeam, prize }) {
  return (
    <div className="prize-details">
      <Link to={`/team/teamdetail/${id}`}>
        <span>{position}</span>
        <img className="prize-img" src={image} alt="prize-details" />
        <h3 className="prize-winnerTeam">{winnerTeam}</h3>
      </Link>
      <div className="prize-wraper">
        <span>{prize}</span>
      </div>
    </div>
  );
}

export default PrizeDetail;
