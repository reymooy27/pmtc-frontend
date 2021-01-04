import React, { useEffect } from 'react'
import './Tournaments.css'
import { Link } from 'react-router-dom'
import {fetchAllTournament, selectAllTournament, selectLoading} from '../redux/reducers/tournamentSlice'
import {useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Loader from 'react-loader-spinner'

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
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    setInterval(() => {
      dispatch(fetchAllTournament())
    }, 5000);
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
        <>
    <div className='tournaments-img'>
    <img loading='lazy' src='https://images.wallpapersden.com/image/download/pubg-key-art_bGVuZ26UmZqaraWkpJRoZ2VlrWZtZWU.jpg' alt=''/>
    <div className='fade'>
      <h1>Step up your game</h1>
      <span>Bertarung dengan pemain lain yang lebih kompetitif</span>
    </div>
    </div>
    <div className='tournaments'>
      <h2 className='tournaments-title'>Turnamen</h2>
      <div className='tournament-container'>
        {allTournament.map(t=>(
          <Link to={`/tournament/${t._id}`} key={t._id}>
            <div className='tournament' style={{background: `url(${t.tournamentPicture})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'}}>
              {t.status === 'OPEN' && <span className='tournaments-status open'>Buka</span>}
              {t.status === 'COMPLETED' && <span className='tournaments-status completed'>Selesai</span>}
              {t.status === 'CANCELED' && <span className='tournaments-status canceled'>Dibatalkan</span>}
              {t.status === 'ONGOING' && <span className='tournaments-status ongoing'>Berlangsung</span>}
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
    </>
      }
    
    </>
  )
}

export default Tournaments
