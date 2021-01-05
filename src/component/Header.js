import React from "react";
import TournamentDetail from "./TournamentDetail";
import { Link } from "react-router-dom";
import "./Header.css";
import {selectTournament, selectTournamentTeam} from '../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";
import moment from 'moment'
function Header() {
  const tournament = useSelector(selectTournament)
  const tournamentTeam = useSelector(selectTournamentTeam)

moment.updateLocale('en', {
    calendar : {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at]',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    }
});

moment.updateLocale('en', {
    months : [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Augustus", "September", "Oktober", "November", "Desember"
    ]
});
moment.updateLocale('en', {
    weekdays : [
        "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    ]
});

  return (
    <div className="header">
      <div className="header-1" style={{background: `url(${tournament.tournamentPicture}) no-repeat center/cover`,backgroundBlendMode: 'multiply'}}>
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
            <p>Pendaftaran Tutup</p>
            <span>{moment(tournament.registrationEnd).format('dddd D MMMM')}</span>
          </div>
          <div className="header-1-2-1">
            <p>Turnamen Mulai</p>
            <span>{moment(tournament.startDate).format('dddd D MMMM')}</span>
          </div>
        </div>
      </div>
      <div className="header-2">
        <div className="header-tournament-detail">
          <Link to={`/tournament/${tournament._id}/team`}>
            <TournamentDetail title="Tim" detail={`${tournamentTeam.length}/${tournament.maxSlot}`} />
          </Link>
          <TournamentDetail
            title="Biaya Pendaftaran"
            detail={`Rp. ${new Intl.NumberFormat().format(
              tournament.tournamentFee
            )}`}
          />
          <TournamentDetail title="Mode" detail={tournament.tournamentMode} />
          <TournamentDetail title="Format Turnamen" detail={tournament.tournamentFormat} />
        </div>
        <div className="header-button">
          {tournament.status === 'COMPLETED' && <h3>Turnamen telah selesai</h3>}
          {tournament.status === 'CANCELED' && <h3>Turnamen dibatalkan</h3>}
          {tournament.status === 'ONGOING' && <h3>Turnamen sedang berlangsung...</h3>}
          {tournament.status === 'OPEN' && 
            <Link to={`/team/create/${tournament._id}`}>
              <button className="header-button-registered">Daftar</button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
