import React, { useEffect, useState } from 'react'
import axios from '../axios'


function AdminTable(
{_id,
teamName,
teamPlcPoint,
playerName,
playerName2,
playerName3,
playerName4,
playerName5}) {
  const [plcPoint, setPlcPoint] = useState('')
  const [playerKill, setPlayerKill] = useState('')
  const [player2Kill, setPlayer2Kill] = useState('')
  const [player3Kill, setPlayer3Kill] = useState('')
  const [player4Kill, setPlayer4Kill] = useState('')
  const [player5Kill, setPlayer5Kill] = useState('')
  const [GFplcPoint, setGFPlcPoint] = useState('')
  const [GFplayerKill, setGFPlayerKill] = useState('')
  const [GFplayer2Kill, setGFPlayer2Kill] = useState('')
  const [GFplayer3Kill, setGFPlayer3Kill] = useState('')
  const [GFplayer4Kill, setGFPlayer4Kill] = useState('')
  const [GFplayer5Kill, setGFPlayer5Kill] = useState('')
  const [inGroup, setInGroup] = useState('Pilih Grup...')
  const [toGrandFinal, setToGrandFinal] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [tournamentFirstWinner, setTournamentFirstWinner] = useState(false)
  const [tournamentSecondWinner, setTournamentSecondWinner] = useState(false)
  const [tournamentThirdWinner, setTournamentThirdWinner] = useState(false)


  useEffect(() => {
    let mounted = true

    axios.post('/team/'+ _id).then(res=>{
      if(mounted){
        setPlcPoint(res.data.teamPlcPoint)
        setPlayerKill(res.data.playerKill)
        setPlayer2Kill(res.data.player2Kill)
        setPlayer3Kill(res.data.player3Kill)
        setPlayer4Kill(res.data.player4Kill)
        setPlayer5Kill(res.data.player5Kill)
        setGFPlcPoint(res.data.GFteamPlcPoint)
        setGFPlayerKill(res.data.GFplayerKill)
        setGFPlayer2Kill(res.data.GFplayer2Kill)
        setGFPlayer3Kill(res.data.GFplayer3Kill)
        setGFPlayer4Kill(res.data.GFplayer4Kill)
        setGFPlayer5Kill(res.data.GFplayer5Kill)
        setInGroup(res.data.inGroup)
        setToGrandFinal(res.data.qualifyToGrandFinal)
        setIsConfirmed(res.data.confirmed)
        setTournamentFirstWinner(res.data.tournamentFirstWinner)
        setTournamentSecondWinner(res.data.tournamentSecondWinner)
        setTournamentThirdWinner(res.data.tournamentThirdWinner)
        }
      })
      .catch(err=> console.log(err))

    return () => mounted = false

  }, [ _id])

async function deleteTeam (i){
    await axios.delete(`/team/delete/${i}`)
    .then(res=> console.log(res.data))
    .catch(err=> console.log(err))
  }

  async function updateTeam(i){
    await axios.put(`/team/update/${i}`, {
      teamKillPoint:
        Number(playerKill) +
        Number(player2Kill) +
        Number(player3Kill) +
        Number(player4Kill) +
        Number(player5Kill),
      teamPlcPoint: plcPoint,
      playerKill: playerKill,
      player2Kill: player2Kill,
      player3Kill: player3Kill,
      player4Kill: player4Kill,
      player5Kill: player5Kill,
      inGroup: inGroup,
      qualifyToGrandFinal: toGrandFinal,
      GFteamKillPoint:
        Number(GFplayerKill) +
        Number(GFplayer2Kill) +
        Number(GFplayer3Kill) +
        Number(GFplayer4Kill) +
        Number(GFplayer5Kill),
      GFteamPlcPoint: GFplcPoint,
      GFplayerKill: GFplayerKill,
      GFplayer2Kill: GFplayer2Kill,
      GFplayer3Kill: GFplayer3Kill,
      GFplayer4Kill: GFplayer4Kill,
      GFplayer5Kill: GFplayer5Kill,
      tournamentFirstWinner: tournamentFirstWinner,
      tournamentSecondWinner: tournamentSecondWinner,
      tournamentThirdWinner: tournamentThirdWinner,
      confirmed: isConfirmed,
    })
    .then(res=> alert(res.data))
    .catch(err=> console.log(err))
  }

  return (
              <tr>
                <td>{teamName}</td>
                <td>
                  <input 
                  onChange={(e)=> setPlcPoint(e.target.value)} 
                  value={plcPoint} 
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName}</td>
                <td>
                  <input 
                  onChange={(e)=> setPlayerKill(e.target.value)} 
                  value={playerKill} 
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName2}</td>
                <td>
                  <input 
                  onChange={(e)=> setPlayer2Kill(e.target.value)} 
                  value={player2Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName3}</td>
                <td>
                  <input 
                  onChange={(e)=> setPlayer3Kill(e.target.value)} 
                  value={player3Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName4}</td>
                <td>
                  <input 
                  onChange={(e)=> setPlayer4Kill(e.target.value)} 
                  value={player4Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                {playerName5 ? <td>{playerName5}</td> : <td></td>}
                {playerName5 ? 
                <td>
                  <input 
                  onChange={(e)=> setPlayer5Kill(e.target.value)} 
                  value={player5Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td> : <td></td>}
                <td>
                  <input 
                  type='checkbox'
                  onChange={e=> setToGrandFinal(e.target.checked)}
                  checked={toGrandFinal}
                  >
                  </input>
                </td>
                <td>
                  <select name="inGroup" onChange={e=> setInGroup(e.target.value)} value={inGroup}>
                    <option value="Pilih Grup">Pilih Grup</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </td>
                <td>
                  <input 
                  type='checkbox'
                  onChange={e=> setIsConfirmed(e.target.checked)}
                  checked={isConfirmed}
                  >
                  </input>
                </td>
                {toGrandFinal? <><td>
                  <input 
                  onChange={(e)=> setGFPlcPoint(e.target.value)} 
                  value={GFplcPoint}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName}</td>
                <td>
                  <input 
                  onChange={(e)=> setGFPlayerKill(e.target.value)} 
                  value={GFplayerKill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName2}</td>
                <td>
                  <input 
                  onChange={(e)=> setGFPlayer2Kill(e.target.value)} 
                  value={GFplayer2Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName3}</td>
                <td>
                  <input 
                  onChange={(e)=> setGFPlayer3Kill(e.target.value)} 
                  value={GFplayer3Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                <td>{playerName4}</td>
                <td>
                  <input 
                  onChange={(e)=> setGFPlayer4Kill(e.target.value)} 
                  value={GFplayer4Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td>
                {playerName5 ? <td>{playerName5}</td> : <td></td>}
                {playerName5 ? 
                <td>
                  <input 
                  onChange={(e)=> setGFPlayer5Kill(e.target.value)} 
                  value={GFplayer5Kill}  
                  type='number' 
                  pattern="[0-9]+">
                  </input>
                </td> : <td></td>}
                <td>
                  <input 
                  type='checkbox'
                  onChange={e=> setTournamentFirstWinner(e.target.checked)}
                  checked={tournamentFirstWinner}
                  >
                  </input>
                </td>
                <td>
                  <input 
                  type='checkbox'
                  onChange={e=> setTournamentSecondWinner(e.target.checked)}
                  checked={tournamentSecondWinner}
                  >
                  </input>
                </td>
                <td>
                  <input 
                  type='checkbox'
                  onChange={e=> setTournamentThirdWinner(e.target.checked)}
                  checked={tournamentThirdWinner}
                  >
                  </input>
                </td></> : 
                <>
                <td colSpan='14'></td>
                </>}
                <td>
                  <div className='action'>
                  <button className='update_button' type='submit' onClick={()=> updateTeam(_id)}>Update</button>
                  <button className='delete_button' type='submit' onClick={()=>{
                    if(window.confirm('Yakin ingin menghapus')){
                      deleteTeam(_id)
                    }
                  }}>Delete</button>
                  </div>
                </td>
              </tr>
  )
}

export default AdminTable
