import React, {useState} from "react";
import TournamentDetail from "./TournamentDetail";
import { Link } from "react-router-dom";
import "./Header.css";
import {selectTournament, selectTournamentTeam} from '../../redux/reducers/tournamentSlice'
import { useSelector } from "react-redux";
import moment from 'moment'
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { selectUser } from "../../redux/reducers/userSlice";

function Header() {

  const user = useSelector(selectUser)
  const tournament = useSelector(selectTournament)
  const tournamentTeam = useSelector(selectTournamentTeam)

  const [open, setOpen] = useState(false);

  const handleOpen = ()=>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  return (
    <>
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
            <h1>{tournament.tournamentFirstPrize +tournament.tournamentSecondPrize +tournament.tournamentThirdPrize < 1 ? '-':  `Rp. ${new Intl.NumberFormat().format(
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
              detail={tournament.tournamentFee < 1 ? 'Gratis' : `Rp. ${new Intl.NumberFormat().format(
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
              <button onClick={handleOpen} className="header-button-registered">Daftar</button>
            }
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Foto Profil</DialogTitle>
        <DialogContent>
          {user?.myTeam?.map((team,i)=>(
            <span>{team.teamName}</span>
          ))}
        </DialogContent>
        <DialogActions>
          <button className='cancel-button' onClick={handleClose}>
            Batal
          </button>
          <button className='create-team-button' onClick={handleClose}>Upload</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
