import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/reducers/userSlice'
import './ProfileStats.css'

function ProfileStats({isUser, user_}) {
  const user = useSelector(selectUser)
  const data = isUser ? user : user_


  document.title = `${data?.username} - Statistik`

  return (
    <div className='container'>
      <div className="specialFont-wraper">
          <h4 className="specialFont">Stats</h4>
      </div>
      <div className='profile-stats'>
        {data?.pubgMobileStats?.totalMatchPlayed > 0 ? 
        <div className='profile-stats-game-wraper'>
          <div className='profile-overview-diaolog-game-choose profile-overview-diaolog-game-choose-no-hover'>
            <img src={require(`../img/pubg_game_app_logo.png`)} alt=''/>
          </div>
          <div className='profile-stats-game-statistic'>
            <p>Username: {data?.pubgMobileStats?.nickInGamePUBGMobile}</p> 
            <p>ID: {data?.pubgMobileStats?.idInGamePUBGMobile}</p> 
            <p>Match: {data?.pubgMobileStats?.totalMatchPlayed}</p> 
            <p>Win Rate: {(data?.pubgMobileStats?.winRate) * 100}%</p> 
            <p>Kill: {data?.pubgMobileStats?.totalKill}</p> 
            <p>Damage: {data?.pubgMobileStats?.totalDamage}</p> 
            <p>K/D: {data?.pubgMobileStats?.killPerDeath}</p> 
            <p>Assist: {data?.pubgMobileStats?.totalAssist}</p> 
          </div>
        </div>
        :
        <div className='profile-no-stats'>
          <h3>Belum memiliki statistik</h3>
        </div>
         }
      </div>
    </div>
  )
}

export default ProfileStats
