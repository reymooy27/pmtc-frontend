import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { Button, FormControlLabel, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTournament } from '../redux/reducers/tournamentSlice';
 

function EditTurnamen() {
  const [tournamentName, setTournamentName] = useState('')
  const [description, setDescription] = useState('');
  const [information, setInformation] = useState('')
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
  const [admins, setAdmins] = useState([])
  const [showGroupStandings, setShowGroupStandings] = useState(false)
  const [showGrandFinal, setShowGrandFinal] = useState(false)
  const [showKillStanding, setShowKillStanding] = useState(false)
  const [registrationClosed, setRegistrationClosed] = useState(false)
  const [status, setStatus] = useState('')
  
  const dispatch = useDispatch()
  const allTournament = useSelector(selectAllTournament)
  const [currentTurnamenID, setcurrentTurnamenID] = useState('')


  useEffect(() => {
  let mounted = true

async function fecthData(){
  await axios.post('/tournament/'+ currentTurnamenID).then(res=>{
    if(mounted){
      setTournamentName(res.data.tournamentName)
      // setTournamentPicture(res.data.tournamentPicture)
      setDescription(res.data.description)
      setInformation(res.data.information)
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
      setAdmins(res.data.admins)
      setShowGroupStandings(res.data.showGroupStandings)
      setShowGrandFinal(res.data.showGrandFinal)
      setShowKillStanding(res.data.showKillStanding)
      setRegistrationClosed(res.data.registrationClosed)
      setStatus(res.data.status)
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
    await axios.patch(`/tournament/${currentTurnamenID}/update`, {
      tournamentName: tournamentName,
      description: description,
      information: information,
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
      admins: admins,
      showGroupStandings: showGroupStandings,
      showGrandFinal: showGrandFinal,
      showKillStanding: showKillStanding,
      registrationClosed: registrationClosed,
      status: status
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
      <h2>Edit Turnamen</h2>
      <select
        value={currentTurnamenID} 
        onChange={e=> setcurrentTurnamenID(e.target.value)}
      >
        <option value=''>Pilih Turnamen</option>
        {allTournament.map(t=> <option key={t._id} value={t._id}>{t.tournamentName}</option>)}
      </select>
      <br></br>
      <div className='inputContainer'>
        <label>Nama Turnamen</label>
        <input 
        type='text' 
        value={tournamentName} 
        onChange={e=> setTournamentName(e.target.value)} />
      </div>
      <div className='inputContainer'>
        <label>Deskripsi</label>
        <textarea name='description' className='profile-setting-textarea' rows="6" cols="50" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
      </div>
      <div className='inputContainer'>
        <label>Informasi</label>
        <textarea name='information' className='profile-setting-textarea' rows="6" cols="50" value={information} onChange={(e)=> setInformation(e.target.value)}></textarea>
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
        <FormControlLabel
        control={
          <Switch
          checked={showGroupStandings}
          onChange={e=> setShowGroupStandings(e.target.checked)}
          name="groupStanding"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        label="Grup Standing"
      />
      </div>
      <div className='inputContainer'>
        <FormControlLabel
        control={
          <Switch
            checked={showGrandFinal}
            onChange={(e)=> setShowGrandFinal(e.target.checked)}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        label="Grandfinal Standing"
      />
      </div>
      <div className='inputContainer'>
        <FormControlLabel
        control={
          <Switch
          checked={showKillStanding}
          onChange={(e)=> setShowKillStanding(e.target.checked)}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        label="Kill Standing"
      />
      </div> 
      <div className='inputContainer'>
        <FormControlLabel
        control={
          <Switch
          checked={registrationClosed}
          onChange={(e)=> setRegistrationClosed(e.target.checked)}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        label="Registrasi Tutup"
      />
      </div>
      <div className='inputContainer'>
        <label>Status</label>
        <select
          value={status} 
          onChange={(e)=> setStatus(e.target.value)}
        >
          <option value=''>None</option>
          <option value='OPEN'>Buka</option>
          <option value='CLOSED'>Tutup</option>
          <option value='COMPLETED'>Selesai</option>
          <option value='ONGOING'>Berlangsung</option>
          <option value='CANCELED'>Dibatalkan</option>
        </select>
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
