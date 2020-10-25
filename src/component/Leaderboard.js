import React from "react";
import "./Leaderboard.css";
import LeaderboardGroup from "./LeaderboardGroup";
import GrandfinalGroup from "./GrandfinalGroup";
import {selectTournament} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";

function Leaderboard() {
  const tournament = useSelector(selectTournament)
  
  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Leaderboard</h4>
      </div>
      {tournament.showGroupStandings && tournament.teams.length >=1 ? (
        <div className="leaderboard">
          <LeaderboardGroup inGroup="A" />
          <LeaderboardGroup inGroup="B" />
          <LeaderboardGroup inGroup="C" />
          <LeaderboardGroup inGroup="D" />
          {tournament.showGrandFinal ? <GrandfinalGroup /> : ""}
        </div>
      ) : (
        <div className="no-participant">
          <h3>Belum Tersedia Saat Ini</h3>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
