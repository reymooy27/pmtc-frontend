import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

function TournamentCard({_id,
  tournamentPicture,
  status,
  tournamentName,
  tournamentFirstPrize,
  tournamentSecondPrize,
  tournamentThirdPrize,
  startDate,
  tournamentMode,
  teams,
  maxSlot}) {
  return (
    <Link to={`/tournament/${_id}`} key={_id}>
      <div className='tournament' style={{background: `url(${tournamentPicture})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply'}}>
        {status === 'OPEN' && <span className='tournaments-status open'>Buka</span>}
        {status === 'COMPLETED' && <span className='tournaments-status completed'>Selesai</span>}
        {status === 'CANCELED' && <span className='tournaments-status canceled'>Dibatalkan</span>}
        {status === 'ONGOING' && <span className='tournaments-status ongoing'>Berlangsung</span>}
        <div className='pubg-logo'></div>
        <h3>{tournamentName}</h3>
        <h3>{tournamentFirstPrize +tournamentSecondPrize +tournamentThirdPrize < 1 ? '-' : `Rp. ${new Intl.NumberFormat().format(
        tournamentFirstPrize +tournamentSecondPrize +tournamentThirdPrize
      )}`}</h3>
        <div className='tournament-bottom'>
          <span>{moment(Date.now()).to(startDate)}</span>
          <span>{tournamentMode}</span>
          <span>{`${teams.length}/${maxSlot} slot`}</span>
        </div>
      </div>
    </Link>
  )
}

export default TournamentCard
