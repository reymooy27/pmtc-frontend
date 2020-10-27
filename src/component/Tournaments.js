import React from 'react'
import './Tournaments.css'
import axios from '../axios'
import { Link } from 'react-router-dom'
import {getTournamentData, getTournamentID, selectAllTournament} from '../redux/reducers/tournamentSlice'
import { useDispatch, useSelector } from 'react-redux'

function Tournaments() {

  const allTournament = useSelector(selectAllTournament)
  const dispatch = useDispatch()

  async function fetchData(id) {
      const req = await axios.post("/tournament/" + id);
        dispatch(getTournamentData(req.data))
        dispatch(getTournamentID(req.data._id))
    }
  return (
    <div className='tournaments'>
      <h2 className='tournaments-title'>Turnamen</h2>
      <div className='tournament-container'>
        {allTournament.map(t=>(
          <Link to={`tournament/${t._id}`} onClick={()=> fetchData(t._id)} key={t._id}>
            <div className='tournament'>
              <div className='pubg-logo'></div>
              <h3>{t.tournamentName}</h3>
              <h3>{`Rp. ${new Intl.NumberFormat().format(
              t.tournamentFirstPrize +t.tournamentSecondPrize +t.tournamentThirdPrize
            )}`}</h3>
              <div className='tournament-bottom'>
                <span>{t.startDate}</span>
                <span>TPP Squad</span>
                <span>{`${t.teams.length}/64 slot`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tournaments
