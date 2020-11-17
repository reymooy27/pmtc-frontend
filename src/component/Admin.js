import React, { Fragment, useEffect, useState } from 'react'
import './Admin.css'
import { Redirect } from 'react-router-dom'
import {selectUser} from '../redux/reducers/userSlice'
import {selectAllTournament,} from '../redux/reducers/tournamentSlice'
import AdminTable from './AdminTable'
import axios from '../axios'
import {useSelector } from 'react-redux'
import CreateTournament from './CreateTournament'
import EditTurnamen from './EditTurnamen'

function Admin() {

  const allTournament = useSelector(selectAllTournament)
  const user = useSelector(selectUser)

  const [currentTurnamen, setcurrentTurnamen] = useState([])
  const [currentTurnamenID, setCurrentTurnamenID] = useState('')


useEffect(() => {
  let mounted = true

  axios.post('/tournament/'+ currentTurnamenID).then(res=>{
    if(mounted){
      setcurrentTurnamen(res.data.teams)
      }
    })
      .catch(err=> console.log(err))

  return ()=> mounted = false
}, [currentTurnamenID])

const isAdmin = user !== null ? user.role === 'ADMIN' : null

  return (
    <Fragment>
      {isAdmin ? 
        <div className='admin'>
          <select
            value={currentTurnamenID} 
            onChange={e=> setCurrentTurnamenID(e.target.value)}
          >
            <option value=''>Pilih Turnamen</option>
            {allTournament.map(t=> <option key={t._id} value={t._id}>{t.tournamentName}</option>)}
          </select>
            <br></br>
            <br></br>
            <div className='admin-teams'>
                <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Poin</th>
                    <th>Lolos Grandfinal</th>
                    <th>Grup</th>
                    <th>Dikonfirmasi</th>
                    <th>Poin</th>
                    <th>Juara 1</th>
                    <th>Juara 2</th>
                    <th>Juara 3</th>
                    <th colSpan='2'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTurnamen.length > 0 ? <>{currentTurnamen.map(team => (
                        <AdminTable 
                          key={team._id} 
                          _id={team._id} 
                          teamName={team.teamName} 
                          teamPlcPoint={team.teamPlcPoint} 
                          playerName={team.playerName}
                          playerName2={team.playerName2}
                          playerName3={team.playerName3}
                          playerName4={team.playerName4}
                          playerName5={team.playerName5}
                          playerKill_={team.playerKill}
                          player2Kill_={team.player2Kill}
                          player3Kill_={team.player3Kill}
                          player4Kill_={team.player4Kill}
                          player5Kill_={team.player5Kill}
                          />
                  ))}</> : 
                  <tr>
                    <td>Tidak ada tim</td>
                  </tr>
                  }
                </tbody>
              </table >
            </div>
            <br></br>
            <br></br>
            <br></br>
            <EditTurnamen currentTurnamenID={currentTurnamenID}/>
            <br></br>
            <br></br>
            <CreateTournament/>
        </div> 
      : <Redirect to='/login'/>}
    </Fragment>
    
  )
}

export default Admin
