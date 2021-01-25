import React from 'react'
import {selectUser} from '../redux/reducers/userSlice'
import {useSelector } from 'react-redux'
import './ProfileTournaments.css'

function ProfileTournaments({isUser, user_}) {

  const user = useSelector(selectUser)
  const data = isUser ? user : user_

  document.title = `${data?.username} - Turnamen`
  
  const tournaments = data.inTournaments.map(f=> <span>{f.tournamentName}</span>)
  
  return (
    <div className='container'>
      <div className="specialFont-wraper">
        <h4 className="specialFont">Turnamen</h4>
      </div>
      <div className='profile-tournaments'>
        {data.inTournaments.length < 1 ? 
        <div className='profile-no-tournaments'>
          <h3>Belum mengikuti turnamen apapun</h3>
        </div> : tournaments }
      </div>
    </div>
  )
}

export default ProfileTournaments
