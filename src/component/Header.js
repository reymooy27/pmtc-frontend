import React from "react";
import TournamentDetail from "./TournamentDetail";
import { Link } from "react-router-dom";
import "./Header.css";
import {selectTournament,selectTournamentID} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";

function Header() {
  const tournament = useSelector(selectTournament)
  const tournamentID = useSelector(selectTournamentID)


  return (
    <div className="header">
      <div className="header-1">
        <div className="header-1-1">
          <div className="header-logo">
            <img src="../logo.png" className="navbar-logo" alt="" />
          </div>
          <div className="header-title">
            <h1>{tournament.tournamentName}</h1>
          </div>
          <div className='header-prize-pool'>
          <h1>{`Rp. ${new Intl.NumberFormat().format(
              tournament.tournamentFirstPrize +tournament.tournamentSecondPrize +tournament.tournamentThirdPrize
            )}`}</h1>
          </div>
        </div>
        <div className="header-1-2">
          <div className="header-1-2-1">
            <p>Pendaftaran Buka</p>
            <span>{tournament.registrationStart}</span>
          </div>
          <div className="header-1-2-1">
            <p>Turnamen Mulai</p>
            <span>{tournament.startDate}</span>
          </div>
        </div>
      </div>
      <div className="header-2">
        <div className="header-tournament-detail">
          <Link to={`/tournament/${tournamentID}/team`}>
            <TournamentDetail title="Tim" detail={`${tournament.teams.length}/64`} />
          </Link>
          <TournamentDetail
            title="Biaya Pendaftaran"
            detail={`Rp. ${new Intl.NumberFormat().format(
              tournament.tournamentFee
            )}`}
          />
          <TournamentDetail title="Mode" detail="Squad TPP" />
          <TournamentDetail title="Format Turnamen" detail="Eliminasi Grup" />
        </div>
        <div className="header-button">
          {tournament.registrationClosed ? (
            <button className="header-button-disabled">
              Pendaftaran Tutup
            </button>
          ) : (
            <Link to={`/team/create/${tournamentID}`}>
              <button className="header-button-registered">Daftar</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
