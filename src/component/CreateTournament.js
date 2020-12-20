import React, { useState } from 'react'
import axios from '../axios'
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { setErrorMessage, setOpenErrorSnackbar, setOpenSuccessSnackbar, setSuccessMessage } from '../redux/reducers/appSlice';
import { useDispatch } from 'react-redux';


function CreateTournament() {
  const [tournamentName, setTournamentName] = useState('')
  const [tournamentMode, setTournamentMode] = useState('TPP Solo')
  const [tournamentFormat, setTournamentFormat] = useState('Eliminasi Grup')
  const [tournamentPicture, setTournamentPicture] = useState(null)
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

  const dispatch = useDispatch()

  const formdata = new FormData()
  formdata.append('tournamentName',tournamentName)
  formdata.append('tournamentPicture',tournamentPicture)
  formdata.append('tournamentMode',tournamentMode)
  formdata.append('tournamentFormat',tournamentFormat)
  formdata.append('tournamentFirstPrize',tournamentFirstPrize)
  formdata.append('tournamentSecondPrize',tournamentSecondPrize)
  formdata.append('tournamentThirdPrize',tournamentThirdPrize)
  formdata.append('tournamentFee',tournamentFee)
  formdata.append('registrationEnd',registrationEnd)
  formdata.append('startDate',startDate)
  formdata.append('rounds',JSON.stringify(rounds))
  formdata.append('groups',groups)
  formdata.append('maxSlot',maxSlot)

  const createTournament = ()=>{
    axios.post('/tournament/create',formdata,{
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
    } )
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
    <div className='createTournament'>
      <h3>Buat Turnamen Baru</h3>
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
      <div className='inputContainer'>
        <input
          type='file'
          name='tournamentPicture'
          onChange={e=> setTournamentPicture(e.target.files[0])}
          >
        </input>
      </div>
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
        // value={rounds[i].round}
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
        // value={rounds[i].time}
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
        // value={rounds[i].match}
        onChange={e=>{
          rounds[i] = {...rounds[i],match: e.target.value}
          setRounds(rounds)
        }}
        />
      </div>
      <div className='inputContainer'>
        <label>Round Maps</label>
        <select
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
        <Button
          variant="contained"
          color="primary"
          onClick={createTournament}
          startIcon={<CreateIcon />}
        >
          Create
        </Button>
      </div>      
    </div>
  )
}

export default CreateTournament
