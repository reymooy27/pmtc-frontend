import React, { useEffect } from 'react'
import './Tournaments.css'
import axios from '../axios'
import { Link } from 'react-router-dom'
import {getAllTournament, selectAllTournament} from '../redux/reducers/tournamentSlice'
import { useDispatch, useSelector } from 'react-redux'

function Tournaments() {

  const allTournament = useSelector(selectAllTournament)
  const dispatch = useDispatch()

  useEffect(() => {
  let mounted = true

  async function getTournaments(){
    const res = await axios.post('/api/v1/tournaments')
    if(mounted){
      dispatch(getAllTournament(res.data))

    }
  }

  setTimeout(() => {
  getTournaments()
  },300)
  
  return ()=> mounted = false
}, [dispatch])

  return (
    <div className='tournaments'>
      <h2 className='tournaments-title'>Turnamen</h2>
      <div className='tournament-container'>
        {allTournament.map(t=>(
          <Link to={`tournament/${t._id}`} key={t._id}>
            <div className='tournament'>
              <div className='pubg-logo'></div>
              <h3>{t.tournamentName}</h3>
              <h3>{`Rp. ${new Intl.NumberFormat().format(
              t.tournamentFirstPrize +t.tournamentSecondPrize +t.tournamentThirdPrize
            )}`}</h3>
              <div className='tournament-bottom'>
                <span>{new Date(t.startDate).toUTCString().slice(0,12)}</span>
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
