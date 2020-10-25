import React, { Fragment, useEffect, useState } from 'react'
import './Admin.css'
import { Redirect } from 'react-router-dom'
import {selectUser} from '../redux/reducers/userSlice'
import {selectTournament} from '../redux/reducers/tournamentSlice'
import { useSelector } from 'react-redux'
import AdminTable from './AdminTable'
import axios from '../axios'

function Admin() {
  
  const user = useSelector(selectUser)
  const tournament = useSelector(selectTournament)

  const [tournamentName, setTournamentName] = useState('')
  const [tournamentFirstPrize, setTournamentFirstPrize] = useState('')
  const [tournamentSecondPrize, setTournamentSecondPrize] = useState('')
  const [tournamentThirdPrize, setTournamentThirdPrize] = useState('')
  const [tournamentFee, setTournamentFee] = useState('')
  const [registrationStart, setRegistrationStart] = useState('')
  const [startDate, setStartDate] = useState('')
  const [grandFinalDate, setGrandFinalDate] = useState('')
  const [showGroupStandings, setShowGroupStandings] = useState(false)
  const [showGrandFinal, setShowGrandFinal] = useState(false)
  const [showKillStanding, setShowKillStanding] = useState(false)
  const [registrationClosed, setRegistrationClosed] = useState(false)

useEffect(() => {
  let mounted = true

  axios.post('/tournament/5ef4596040d71032dc8bc81d').then(res=>{
    if(mounted){
      setTournamentName(res.data.tournamentName)
      setTournamentFirstPrize(res.data.tournamentFirstPrize)
      setTournamentSecondPrize(res.data.tournamentSecondPrize)
      setTournamentThirdPrize(res.data.tournamentThirdPrize)
      setTournamentFee(res.data.tournamentFee)
      setRegistrationStart(res.data.registrationStart)
      setStartDate(res.data.startDate)
      setGrandFinalDate(res.data.grandFinalDate)
      setShowGroupStandings(res.data.showGroupStandings)
      setShowGrandFinal(res.data.showGrandFinal)
      setShowKillStanding(res.data.showKillStanding)
      setRegistrationClosed(res.data.registrationClosed)
      }
    })
      .catch(err=> console.log(err))

  return ()=> mounted = false
}, [])

  const updateTournament = ()=>{
    axios.put('/tournament/update', {
      tournamentName,
        tournamentFirstPrize,
        tournamentSecondPrize,
        tournamentThirdPrize,
        tournamentFee,
        registrationStart,
        startDate,
        grandFinalDate,
        showGroupStandings,
        showGrandFinal,
        showKillStanding,
        registrationClosed,
    })
    .then(res=> console.log(res.data))
    .catch(err=> console.log(err))
  }
  
  return (
    <Fragment>
      {user ? 
        <div className='admin'>
            <table>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Placement Poin</th>
                  <th colSpan='10'>Player Kill</th>
                  <th>Lolos Grandfinal</th>
                  <th>Grup</th>
                  <th>Dikonfirmasi</th>
                  <th>GF Placement Poin</th>
                  <th colSpan='10'>GF Player Kill</th>
                  <th>Juara 1</th>
                  <th>Juara 2</th>
                  <th>Juara 3</th>
                  <th colSpan='2'>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tournament.teams.map(team => (
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
                ))}
              </tbody>
            </table>
            <br></br>
            <br></br>
            <br></br>
            <table className='tournament_table'>
              <thead>
                <tr>
                  <th colSpan='2'>Turnamen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nama Turnamen</td>
                  <td>
                    <input
                    type='text'
                    value={tournamentName}
                    onChange={e=> setTournamentName(e.target.value)}
                    >
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Hadiah Pertama</td>
                  <td>
                    <input
                    type='number'
                    value={tournamentFirstPrize}
                    onChange={e=> setTournamentFirstPrize(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Hadiah Kedua</td>
                  <td>
                    <input
                    type='number'
                    value={tournamentSecondPrize}
                    onChange={e=>setTournamentSecondPrize(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Hadiah Ketiga</td>
                  <td>
                    <input
                    type='number'
                    value={tournamentThirdPrize}
                    onChange={e=>setTournamentThirdPrize(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Biaya Pendaftaran</td>
                  <td>
                    <input
                    type='number'
                    value={tournamentFee}
                    onChange={e=>setTournamentFee(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Registrasi Mulai</td>
                  <td>
                    <input
                    type='text'
                    value={registrationStart}
                    onChange={e=>setRegistrationStart(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Turnamen Mulai</td>
                  <td>
                    <input
                    type='text'
                    value={startDate}
                    onChange={e=>setStartDate(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Grand Final Mulai</td>
                   <td>
                    <input
                    type='text'
                    value={grandFinalDate}
                    onChange={e=>setGrandFinalDate(e.target.value)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Show Grup Standing</td>
                  <td>
                    <input
                    type='checkbox'
                    checked={showGroupStandings}
                    onChange={e=>setShowGroupStandings(e.target.checked)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Show GF Standing</td>
                  <td>
                    <input
                    type='checkbox'
                    checked={showGrandFinal}
                    onChange={e=>setShowGrandFinal(e.target.checked)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Show Kill Standing</td>
                  <td>
                    <input
                    type='checkbox'
                    checked={showKillStanding}
                    onChange={e=>setShowKillStanding(e.target.checked)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td>Pendaftaran Tutup</td>
                  <td>
                    <input
                    type='checkbox'
                    checked={registrationClosed}
                    onChange={e=>setRegistrationClosed(e.target.checked)}>
                    </input>
                  </td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <button className='update_button' type='submit' onClick={updateTournament}>Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
        </div> 
      : <Redirect to='/login'/>}
    </Fragment>
    
  )
}

export default Admin
