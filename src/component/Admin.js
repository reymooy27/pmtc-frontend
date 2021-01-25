import React, { Fragment, useEffect, useState } from 'react'
import './Admin.css'
import { Link, Redirect } from 'react-router-dom'
import {selectUser} from '../redux/reducers/userSlice'
import {selectAllTournament,} from '../redux/reducers/tournamentSlice'
import AdminTable from './AdminTable'
import axios from '../axios'
import {useSelector } from 'react-redux'
import CreateTournament from './CreateTournament'
import EditTurnamen from './EditTurnamen'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import TournamentParticipantDetails from './TournamentParticipantDetails'

function Admin() {

  document.title = `Admin`
  
  const allTournament = useSelector(selectAllTournament)
  const user = useSelector(selectUser)

  const [currentTurnamen, setcurrentTurnamen] = useState([])
  const [currentTurnamenID, setCurrentTurnamenID] = useState('')

  const [grup, setGrup] = useState('allTeam')
  const [some, setSome] = useState(currentTurnamen)

  let { path } = useRouteMatch();

useEffect(() => {
  let mounted = true

  axios.get('/tournament/'+ currentTurnamenID).then(res=>{
    if(mounted){
      setcurrentTurnamen(res.data.teams)
      }
    })
      .catch(err=> console.log(err))

  return ()=> mounted = false
}, [currentTurnamenID])

useEffect(() => {
  let mounted = true

  if(mounted){
    const newArray = currentTurnamen.filter((team) => {
      if (team.inGroup === grup) {
        return team;
      }
      return null
    });
    setSome(newArray)
  }
  
  return () => {
    mounted = false
  }
}, [currentTurnamen, grup])

useEffect(() => {
  if (grup === 'allTeam') {
    setSome(currentTurnamen)
  }
}, [grup,currentTurnamen])

const isAdmin = user !== null ? user?.role === 'ADMIN' : null

  return (
    <Fragment>
      {!isAdmin && <Redirect to='/'/>}
        <div className='admin'>
            <Switch>
              <Route exact path={path}>
                <h2>Pilih Turnamen</h2>
                <select
            value={currentTurnamenID} 
            onChange={e=> setCurrentTurnamenID(e.target.value)}
          >
            <option value=''>Pilih Turnamen</option>
            {allTournament.map(t=> <option key={t._id} value={t._id}>{t.tournamentName}</option>)}
          </select>
            <br></br>
            <div className='admin-link-wraper'>
              <Link className='admin-link' to='/admin/tournament/edit'>Edit Turnamen</Link>
              <Link className='admin-link' to='/admin/tournament/create'>Buat Turnamen</Link>
              <Link className='admin-link' to='/admin/tournament/participant/details'>Detail Participant</Link>
            </div>
            <select
            value={grup} 
            onChange={e=> setGrup(e.target.value)}
          >
            <option value='allTeam'>Semua Tim</option>
            <option value='A'>A</option>
            <option value='B'>B</option>
            <option value='C'>C</option>
            <option value='D'>D</option>
            <option value='E'>E</option>
            <option value='F'>F</option>
            <option value='G'>G</option>
            <option value='H'>H</option>
            <option value='I'>I</option>
            <option value='J'>J</option>
            <option value='K'>K</option>
            <option value='L'>L</option>
            <option value='M'>M</option>
          </select>
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
                  {some.length > 0 ? <>{some.map(team => (
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
              </Route>
              <Route path='/admin/tournament/edit'>
                <EditTurnamen currentTurnamenID={currentTurnamenID}/>
              </Route>
              <Route path='/admin/tournament/create'>
                <CreateTournament/>
              </Route>
              <Route path='/admin/tournament/participant/details'>
                <TournamentParticipantDetails tournament={currentTurnamen}/>
              </Route>
            </Switch>
        </div>
    </Fragment>
    
  )
}

export default Admin
