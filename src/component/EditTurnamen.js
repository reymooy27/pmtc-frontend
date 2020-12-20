import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { Button, Checkbox } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';
import { useDispatch } from 'react-redux';
 

function EditTurnamen({currentTurnamenID}) {
  const [tournamentName, setTournamentName] = useState('')
  const [tournamentMode, setTournamentMode] = useState('TPP Solo')
  const [tournamentFormat, setTournamentFormat] = useState('Eliminasi Grup')
  // const [tournamentPicture, setTournamentPicture] = useState(null)
  const [tournamentFirstPrize, setTournamentFirstPrize] = useState('')
  const [tournamentSecondPrize, setTournamentSecondPrize] = useState('')
  const [tournamentThirdPrize, setTournamentThirdPrize] = useState('')
  const [tournamentFee, setTournamentFee] = useState('')
  const [registrationEnd, setRegistrationEnd] = useState('')
  const [startDate, setStartDate] = useState('')
  const [roundTotal, setRoundTotal] = useState('')
  const [rounds, setRounds] = useState([])
  const [groups, setGroups] = useState('')
  const [maxSlot, setMaxSlot] = useState('')
  const [showGroupStandings, setShowGroupStandings] = useState(false)
  const [showGrandFinal, setShowGrandFinal] = useState(false)
  const [showKillStanding, setShowKillStanding] = useState(false)
  const [registrationClosed, setRegistrationClosed] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  const dispatch = useDispatch()

  useEffect(() => {
  let mounted = true

async function fecthData(){
  await axios.post('/tournament/'+ currentTurnamenID).then(res=>{
    if(mounted){
      setTournamentName(res.data.tournamentName)
      // setTournamentPicture(res.data.tournamentPicture)
      setTournamentMode(res.data.tournamentMode)
      setTournamentFormat(res.data.tournamentFormat)
      setTournamentFirstPrize(res.data.tournamentFirstPrize)
      setTournamentSecondPrize(res.data.tournamentSecondPrize)
      setTournamentThirdPrize(res.data.tournamentThirdPrize)
      setTournamentFee(res.data.tournamentFee)
      setRegistrationEnd(res.data.registrationEnd.slice(0,23))
      setStartDate(res.data.startDate.slice(0,23))
      setRoundTotal(res.data.rounds.length)
      setRounds(res.data.rounds)
      setGroups(res.data.groups)
      setMaxSlot(res.data.maxSlot)
      setShowGroupStandings(res.data.showGroupStandings)
      setShowGrandFinal(res.data.showGrandFinal)
      setShowKillStanding(res.data.showKillStanding)
      setRegistrationClosed(res.data.registrationClosed)
      setCompleted(res.data.completed)
      }
    })
      .catch(err=> console.log(err))
}
fecthData()
  return ()=> mounted = false
}, [currentTurnamenID])

  // const formdata = new FormData()
  // formdata.append('tournamentName',tournamentName)
  // formdata.append('tournamentPicture',tournamentPicture)
  // formdata.append('tournamentFirstPrize',tournamentFirstPrize)
  // formdata.append('tournamentSecondPrize',tournamentSecondPrize)
  // formdata.append('tournamentThirdPrize',tournamentThirdPrize)
  // formdata.append('tournamentFee',tournamentFee)
  // formdata.append('registrationStart',registrationStart)
  // formdata.append('startDate',startDate)
  // formdata.append('maxSlot',maxSlot)
  // formdata.append('showGroupStandings',showGroupStandings)
  // formdata.append('showGrandFinal',showGrandFinal)
  // formdata.append('showKillStanding',showKillStanding)
  // formdata.append('registrationClosed',registrationClosed)

  const updateTournament = async ()=>{
    await axios.put(`/tournament/${currentTurnamenID}/update`, {
      tournamentName: tournamentName,
      tournamentMode: tournamentMode,
      tournamentFormat: tournamentFormat,
      tournamentFirstPrize: tournamentFirstPrize,
      tournamentSecondPrize: tournamentSecondPrize,
      tournamentThirdPrize: tournamentThirdPrize,
      tournamentFee: tournamentFee,
      registrationEnd: registrationEnd,
      startDate: startDate,
      rounds: rounds,
      groups: groups,
      maxSlot: maxSlot,
      showGroupStandings: showGroupStandings,
      showGrandFinal: showGrandFinal,
      showKillStanding: showKillStanding,
      registrationClosed: registrationClosed,
      completed: completed,
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

  const deleteTournament = async ()=>{
    await axios.delete(`/tournament/${currentTurnamenID}/delete`)
    .then(res=>{
      dispatch(setSuccessMessage(res.data))
      dispatch(setOpenSuccessSnackbar(true))
    })
    .catch(err=> {
      dispatch(setErrorMessage(err.response.data))
      dispatch(setOpenErrorSnackbar(true))
    })
  }

  return (
    <div className='editTournament'>
      <h3>Edit Turnamen</h3>
      <div className='inputContainer'>
        <label>Nama Turnamen</label>
        <input 
        type='text' 
        value={tournamentName} 
        onChange={e=> setTournamentName(e.target.value)} />
      </div>
      <div className='inputContainer'>
        <label>Mode Turnamen</label>
        <select
          value={tournamentMode} 
          onChange={(e)=> setTournamentMode(e.target.value)}
        >
          <option value='TPP Solo'>TPP Solo</option>
          <option value='TPP Duo'>TPP Duo</option>
          <option value='TPP Squad'>TPP Squad</option>
          <option value='FPP Solo'>FPP Solo</option>
          <option value='FPP Duo'>FPP Duo</option>
          <option value='FPP Squad'>FPP Squad</option>
        </select>
      </div>
      <div className='inputContainer'>
        <label>Format Turnamen</label>
        <select
          value={tournamentFormat} 
          onChange={(e)=> setTournamentFormat(e.target.value)}
        >
          <option value='Eliminasi Grup'>Eliminasi Grup</option>
          <option value='Liga'>Liga</option>
        </select>
      </div>
                {/* <TableRow>
                  <TableCell>Turnamen Picture</TableCell>
                  <TableCell>
                    <input
                    type='file'
                    name='tournamentPicture'
                    accept="image/png"
                    onChange={e=> setTournamentPicture(e.target.files[0])}
                    >
                    </input>
                  </TableCell>
                </TableRow> */}
      <div className='inputContainer'>
        <label>Hadiah Pertama</label>
        <input
          type="number"
          value={tournamentFirstPrize}
          onChange={e=> setTournamentFirstPrize(e.target.value)}
        />
      </div>
      <div className='inputContainer'>
        <label>Hadiah Kedua</label>
        <input
          type="number"
        value={tournamentSecondPrize}
        onChange={e=>setTournamentSecondPrize(e.target.value)}
        />
      </div>
      <div className='inputContainer'>
        <label>Hadiah Ketiga</label>
        <input
        type="number"
        value={tournamentThirdPrize}
        onChange={e=>setTournamentThirdPrize(e.target.value)} 
        />
      </div>
      <div className='inputContainer'>
        <label>Biaya Pendaftaran</label>
        <input
        type="number"
        value={tournamentFee}
        onChange={e=>setTournamentFee(e.target.value)}
        />
      </div>  
      <div className='inputContainer'>
        <label>Registrasi Tutup</label>
        <input
          type='datetime-local'
          value={registrationEnd}
          onChange={e=>setRegistrationEnd(e.target.value)}
        />
      </div>
      <div className='inputContainer'>
        <label>Turnamen Mulai</label>
        <input
        type='datetime-local'
        value={startDate}
        onChange={e=>setStartDate(e.target.value)}
        />
      </div>
      <div className='inputContainer'>
        <label>Round</label>
        <select
          value={roundTotal} 
          onChange={(e)=> setRoundTotal(e.target.value)}
        >
          <option value=''>None</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </div>
      {roundTotal && Array(Number(roundTotal)).fill(roundTotal,0,Number(roundTotal)).map((t,i)=>(
        <div key={i}>
          <h3>{`Round ${i +1}`}</h3>
        <div className='inputContainer'>
        <label>Round Name</label>
        <input
        type='text'
        value={rounds[i] !== undefined ? rounds[i].round : ''}
        onChange={e=>{
          rounds[i] = {...rounds[i],round: e.target.value}
          setRounds(rounds)
        }}
        />
      </div>
      <div className='inputContainer'>
        <label>Round Time</label>
        <input
        type='datetime-local'
        value={rounds[i] !== undefined ? rounds[i].time.slice(0,23) : ''}
        onChange={e=>{
          rounds[i] = {...rounds[i],time: e.target.value}
          setRounds(rounds)
        }}
        />
      </div>
      <div className='inputContainer'>
        <label>Round Match</label>
        <input
        type='number'
        value={rounds[i] !== undefined ? rounds[i].match : ''}
        onChange={e=>{
          rounds[i] = {...rounds[i],match: e.target.value}
          setRounds(rounds)
        }}
        />
      </div>
      <div className='inputContainer'>
        <label>Round Maps</label>
        <select
          value={rounds[i] !== undefined ? rounds[i].map : ''}
          onChange={e=>{
          rounds[i] = {...rounds[i],map: e.target.value}
          setRounds(rounds)
        }}
        >
          <option value=''>None</option>
          <option value='Erangel, Miramar'>Erangel, Miramar</option>
          <option value='Erangel, Miramar, Vikendi'>Erangel, Miramar, Vikendi</option>
          <option value='Erangel, Miramar, Sanhok'>Erangel, Miramar, Sanhok</option>
          <option value='Erangel, Miramar, Sanhok, Vikendi'>Erangel, Miramar, Vikendi, Sanhok</option>
        </select>
      </div>
      </div>
      ))
        }
      <div className='inputContainer'>
        <label>Grup</label>
        <select
          value={groups} 
          onChange={(e)=> setGroups(e.target.value)}
        >
          <option value=''>None</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>   
      <div className='inputContainer'>
        <label>Max Slot</label>
        <select
          value={maxSlot} 
          onChange={(e)=> setMaxSlot(e.target.value)}
        >
          <option value=''>None</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
          <option value={64}>64</option>
          <option value={128}>128</option>
        </select>
      </div>
      <div className='inputContainer'>
        <label>Grup Standing</label>
        <Checkbox
          onChange={e=> setShowGroupStandings(e.target.checked)}
          checked={showGroupStandings}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
      <div className='inputContainer'>
        <label>Grandfinal Standing</label>
        <Checkbox
          onChange={e=> setShowGrandFinal(e.target.checked)}
          checked={showGrandFinal}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
      <div className='inputContainer'>
        <label>Kill Standing</label>
        <Checkbox
          onChange={e=> setShowKillStanding(e.target.checked)}
          checked={showKillStanding}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div> 
      <div className='inputContainer'>
        <label>Registrasi Tutup</label>
        <Checkbox
          onChange={e=> setRegistrationClosed(e.target.checked)}
          checked={registrationClosed}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
      <div className='inputContainer'>
        <label>Turnamen Selesai</label>
        <Checkbox
          onChange={e=> setCompleted(e.target.checked)}
          checked={completed}
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
      
        <Button
          variant="contained"
          color="primary"
          onClick={updateTournament}
          startIcon={<SaveIcon />}
        >
        Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={()=>{
            if(window.confirm('Yakin ingin menghapus')){
              deleteTournament()
            }
          }}
        >
        Delete
        </Button>
    </div>
  )
}

export default EditTurnamen
