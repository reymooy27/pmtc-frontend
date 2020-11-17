import React, { useEffect, useState } from 'react'
import './Tournaments.css'
import { Link } from 'react-router-dom'
import {getAllTournament, selectAllTournament} from '../redux/reducers/tournamentSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Loader from 'react-loader-spinner'
import axios from '../axios'

function Tournaments() {
  
  moment.updateLocale('id', {
    relativeTime : {
        future: "%s lagi",
        past:   "%s lalu",
        s  : 'beberapa detik',
        ss : '%d detik',
        m:  "1 menit",
        mm: "%d menit",
        h:  "1 jam",
        hh: "%d jam",
        d:  "1 hari",
        dd: "%d hari",
        w:  "1 minggu",
        ww: "%d minggu",
        M:  "1 bulan",
        MM: "%d bulan",
        y:  "1 tahun",
        yy: "%d tahun"
    }
});

  const allTournament = useSelector(selectAllTournament)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    let mounted = true
    const fetchAllTournament = async ()=>{
      const res = await axios.post('/api/v1/tournaments')
      if(mounted){
        dispatch(getAllTournament(res.data))
        setLoading(false)
      }
    }
    fetchAllTournament()
    return ()=> mounted = false
}, [dispatch])

  return (
    <>
    {loading ? <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        /> :
    <div className='tournaments'>
      <h2 className='tournaments-title'>Turnamen</h2>
      <div className='tournament-container'>
        {allTournament.map(t=>(
          <Link to={`/tournament/${t._id}`} key={t._id}>
            <div className='tournament' style={{background: `url(${t.tournamentPicture})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'}}>
              <div className='pubg-logo'></div>
              <h3>{t.tournamentName}</h3>
              <h3>{`Rp. ${new Intl.NumberFormat().format(
              t.tournamentFirstPrize +t.tournamentSecondPrize +t.tournamentThirdPrize
            )}`}</h3>
              <div className='tournament-bottom'>
                <span>{moment(Date.now()).to(t.startDate)}</span>
                <span>{t.tournamentMode}</span>
                <span>{`${t.teams.length}/${t.maxSlot} slot`}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
      }
    
    </>
  )
}

export default Tournaments
