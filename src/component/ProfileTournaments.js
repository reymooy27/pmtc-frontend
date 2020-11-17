import React from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import {useSelector } from 'react-redux'

function ProfileTournaments() {

  const user = useSelector(selectUser)
  const tournaments = user.inTournaments.map(f=> <span>{f.tournamentName}</span>)
  
  return (
    <div>
      {user.inTournaments.length < 1 ? <h1>Tidak ada turnamen</h1> : tournaments }
    </div>
  )
}

export default ProfileTournaments
