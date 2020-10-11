import React, { useContext } from "react";
import TournamentDetail from "./TournamentDetail";
import { Link } from "react-router-dom";
import "./Header.css";
import { StateContext } from "../StateProvider";

function Header() {
  const value = useContext(StateContext);

  return (
    <div className="header">
      <div className="header-1">
        <div className="header-1-1">
          <div className="header-logo">
            <img src="../logo.png" className="navbar-logo" alt="" />
          </div>
          <div className="header-title">
            <h1>{value.data_.tournamentName}</h1>
          </div>
        </div>
        <div className="header-1-2">
          <div className="header-1-2-1">
            <p>Pendaftaran Buka</p>
            <span>{value.data_.registrationStart}</span>
          </div>
          <div className="header-1-2-1">
            <p>Turnamen Mulai</p>
            <span>{value.data_.startDate}</span>
          </div>
        </div>
      </div>
      <div className="header-2">
        <div className="header-tournament-detail">
          <Link to="/team">
            <TournamentDetail title="Tim" detail={`${value.data.length}/64`} />
          </Link>
          <TournamentDetail
            title="Biaya Pendaftaran"
            detail={`Rp. ${new Intl.NumberFormat().format(
              value.data_.tournamentFee
            )}`}
          />
          <TournamentDetail title="Mode" detail="Squad TPP" />
          <TournamentDetail title="Format Turnamen" detail="Eliminasi Grup" />
        </div>
        <div className="header-button">
          {value.data_.registrationClosed ? (
            <button className="header-button-disabled">
              Pendaftaran Tutup
            </button>
          ) : (
            <Link to="/registration">
              <button className="header-button-registered">Daftar</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
