import React from "react";
import { Link } from "react-router-dom";
import "./PrizeDetail.css";

import {selectTournament} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";


function PrizeDetail({ id, position, image, winnerTeam, prize }) {
  const tournament = useSelector(selectTournament)

  return (
    <div className="prize-details">
        <span>{position}</span>
        {id ?
      <Link to={`/tournament/${tournament._id}/team/${id}`}>
        <img className="prize-img" src={image} alt="prize-details" />
        <h3 className="prize-winnerTeam">{winnerTeam}</h3>
      </Link> : <img className="prize-img" src={image} alt="prize-details" />
          
        }
      <div className="prize-wraper">
        <span>{prize}</span>
      </div>
    </div>
  );
}

export default PrizeDetail;
