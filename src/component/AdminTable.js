import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';
import {setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';
import { useDispatch } from 'react-redux';


function AdminTable(
{_id,
teamName,
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
  const [inGroup, setInGroup] = useState('')
  const [toGrandFinal, setToGrandFinal] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [tournamentFirstWinner, setTournamentFirstWinner] = useState(false)
  const [tournamentSecondWinner, setTournamentSecondWinner] = useState(false)
  const [tournamentThirdWinner, setTournamentThirdWinner] = useState(false)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    let mounted = true

    axios.get('/team/'+ _id).then(res=>{
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
    .then(res=> {
      dispatch(setSuccessMessage(res.data))
    dispatch(setOpenSuccessSnackbar(true))
    })
    .catch(err=> {
      dispatch(setErrorMessage(err.response.data))
    dispatch(setOpenErrorSnackbar(true))
    })
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
    .then(res=> {
      dispatch(setSuccessMessage(res.data))
    dispatch(setOpenSuccessSnackbar(true))
    })
    .catch(err=> {
      dispatch(setErrorMessage(err.response.data))
    dispatch(setOpenErrorSnackbar(true))
    })
  }

  
  return (
    <>
      <tr>
        <td >{teamName}</td >
        <td className='pointInput'>
          <div className='inputContainer'>
          <label>Placement Point</label>
          <input
            type="number"
            onChange={(e)=> setPlcPoint(e.target.value)} 
            value={plcPoint} 
          />
        </div>
          <div className='inputContainer'>
          <label>{playerName}</label>
          <input
              type="number"
              onChange={(e)=> setPlayerKill(e.target.value)} 
              value={playerKill} 
            />
          </div>
          <div className='inputContainer'>
          <label>{playerName2}</label>
          <input
              type="number"
              onChange={(e)=> setPlayer2Kill(e.target.value)} 
              value={player2Kill} 
            />
          </div>
          <div className='inputContainer'>
          <label>{playerName3}</label>
          <input
              type="number"
              onChange={(e)=> setPlayer3Kill(e.target.value)} 
              value={player3Kill}  
            />
          </div>
          <div className='inputContainer'>
          <label>{playerName4}</label>
          <input
              type="number"
              onChange={(e)=> setPlayer4Kill(e.target.value)} 
              value={player4Kill}  
            />
          </div>
        {playerName5 ? 
          <div className='inputContainer'>
          <label>{playerName5}</label>
          <input
              type="number"
              onChange={(e)=> setPlayer5Kill(e.target.value)} 
              value={player5Kill} 
            />
          </div>
          : ''}
        </td >
        <td >
          <Checkbox
              onChange={e=> setToGrandFinal(e.target.checked)}
              checked={toGrandFinal}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </td >
        <td >
          <select
              id="standard-select"
              label="Grup"
              onChange={e=> setInGroup(e.target.value)} value={inGroup}
            >
              <option value=''>None</option>
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
        </td >
        <td >
          <Checkbox
              onChange={e=> setIsConfirmed(e.target.checked)}
              checked={isConfirmed}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </td >
        {toGrandFinal? <>
        <td className='pointInput'>
          <div className='inputContainer'>
          <label>Placement Point</label>
          <input
            type="number"
            onChange={(e)=> setGFPlcPoint(e.target.value)} 
            value={GFplcPoint} 
          />
        </div>
          <div className='inputContainer'>
          <label>{playerName}</label>
          <input
              type="number"
              onChange={(e)=> setGFPlayerKill(e.target.value)} 
              value={GFplayerKill} 
            />
          </div>
          <div className='inputContainer'>
          <label>{playerName2}</label>
          <input
              type="number"
              onChange={(e)=> setGFPlayer2Kill(e.target.value)} 
              value={GFplayer2Kill} 
            />
          </div>
          <div className='inputContainer'>
          <label>{playerName3}</label>
          <input
              type="number"
              onChange={(e)=> setGFPlayer3Kill(e.target.value)} 
              value={GFplayer3Kill}  
            />
          </div>
          <div className='inputContainer'>
          <label>{playerName4}</label>
          <input
              type="number"
              onChange={(e)=> setGFPlayer4Kill(e.target.value)} 
              value={GFplayer4Kill}  
            />
          </div>
        {playerName5 ? 
          <div className='inputContainer'>
          <label>{playerName5}</label>
          <input
              type="number"
              onChange={(e)=> setGFPlayer5Kill(e.target.value)} 
              value={GFplayer5Kill} 
            />
          </div>
          : ''}
          </td >
        <td >
          <Checkbox
              onChange={e=> setTournamentFirstWinner(e.target.checked)}
          checked={tournamentFirstWinner}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </td >
        <td >
          <Checkbox
              onChange={e=> setTournamentSecondWinner(e.target.checked)}
          checked={tournamentSecondWinner}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </td >
        <td >
          <Checkbox
              onChange={e=> setTournamentThirdWinner(e.target.checked)}
          checked={tournamentThirdWinner}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </td ></> : 
        <>
        <td  colSpan='14'></td >
        </>}
        <td >
          <div className='action'>
            <Button
              variant="contained"
              color="primary"
              onClick={()=> updateTeam(_id)}
              startIcon={<SaveIcon />}
              style={{marginRight: '5px'}}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={()=>{
                if(window.confirm('Yakin ingin menghapus')){
                  deleteTeam(_id)
                }
              }}
            >
              Delete
            </Button>
          </div>
        </td >
      </tr>
    </>
  )
}

export default AdminTable
