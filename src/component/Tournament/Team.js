import React, { Fragment, useEffect, useState } from "react";
import TeamList from "./TeamList";
import "./Team.css";
import {selectTournament} from '../../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";

function Team() {
  const [confirm, setConfirm] = useState(false);
  const [notConfirm, setNotConfirm] = useState(false);
  
  const tournament = useSelector(selectTournament)

  document.title = `${tournament?.tournamentName} - Tim`

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      tournament.teams.map((t) => {
        if (t.confirmed > 0) {
          setConfirm(true);
        }
        if (!t.confirmed > 0) {
          setNotConfirm(true);
        }
        return null;
      });
    }

    return () => (mounted = false);
  }, [tournament.teams]);

  const tlConfirmed = tournament.teams.map((team) => {
    if (team.confirmed) {
      return (
        <TeamList
          key={team._id}
          teamID={team._id}
          teamName={team.teamName}
          abbr={team.singkatanTeam}
          logo={team.logo}
          alt={team.teamName}
          playerName1={team.playerName}
          idPlayer1={team.idPlayer}
          playerName2={team.playerName2}
          idPlayer2={team.idPlayer2}
          playerName3={team.playerName3}
          idPlayer3={team.idPlayer3}
          playerName4={team.playerName4}
          idPlayer4={team.idPlayer4}
          playerName5={team.playerName5}
          idPlayer5={team.idPlayer5}
        />
      );
    }
    return null;
  });
  const tlNotConfirmed = tournament.teams.map((team) => {
    if (!team.confirmed) {
      return (
        <TeamList
          key={team._id}
          teamID={team._id}
          teamName={team.teamName}
          abbr={team.singkatanTeam}
          logo={team.logo}
          alt={team.teamName}
          playerName1={team.playerName}
          idPlayer1={team.idPlayer}
          playerName2={team.playerName2}
          idPlayer2={team.idPlayer2}
          playerName3={team.playerName3}
          idPlayer3={team.idPlayer3}
          playerName4={team.playerName4}
          idPlayer4={team.idPlayer4}
          playerName5={team.playerName5}
          idPlayer5={team.idPlayer5}
        />
      );
    }
    return null;
  });

  return (
    <div className="container">
      <div className="specialFont-wraper">
        <h4 className="specialFont">Tim</h4>
      </div>
      <div className="team">
        <div className="team-registered">
          <h4>Tim : {tournament.teams.length}</h4>
          <h4>Slot Tersedia : {tournament.maxSlot}</h4>
        </div>
        {tournament.teams.length >= 1 ? (
          <Fragment>
            <div
              className="team-confirmed"
              style={{ display: confirm ? "block" : "none" }}
            >
              <h4>Dikonfirmasi</h4>
              {tlConfirmed}
            </div>
            <div
              className="team-not-confirmed"
              style={{ display: notConfirm ? "block" : "none" }}
            >
              <h4>Belum Dikonfirmasi</h4>
              {tlNotConfirmed}
            </div>
          </Fragment>
        ) : (
          <div className="no-participant">
            <h3>Belum Tersedia Saat Ini</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
