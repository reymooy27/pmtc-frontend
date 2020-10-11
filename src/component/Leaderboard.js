import React, { useContext } from "react";
import "./Leaderboard.css";
import LeaderboardGroup from "./LeaderboardGroup";
import GrandfinalGroup from "./GrandfinalGroup";
import { StateContext } from "../StateProvider";

function Leaderboard() {
  const value = useContext(StateContext);

  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Leaderboard</h4>
      </div>
      {value.data_.showGroupStandings ? (
        <div className="leaderboard">
          <LeaderboardGroup inGroup="A" />
          <LeaderboardGroup inGroup="B" />
          <LeaderboardGroup inGroup="C" />
          <LeaderboardGroup inGroup="D" />
          {value.data_.showGrandFinal ? <GrandfinalGroup /> : ""}
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
