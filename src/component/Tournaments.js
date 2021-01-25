import React, { useEffect, useState } from 'react'
import './Tournaments.css'
import {fetchAllTournament, selectAllTournament, selectLoading} from '../redux/reducers/tournamentSlice'
import {useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Loader from 'react-loader-spinner'
import TournamentCard from './TournamentCard'
import socket from '../socket.io'

function Tournaments() {

  document.title = `Home`
  
  moment.updateLocale('id', {
    relativeTime : {
        future: "%s lagi",
        past:   "%s lalu",
        s  : 'beberapa detik',
        ss : '%d detik',
        m:  "1 menit",
        mm: "%d menit",
        h:  "1 jam",
        hh: "%d jam",
        d:  "1 hari",
        dd: "%d hari",
        w:  "1 minggu",
        ww: "%d minggu",
        M:  "1 bulan",
        MM: "%d bulan",
        y:  "1 tahun",
        yy: "%d tahun"
    }
});

  const allTournament = useSelector(selectAllTournament)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()

  const [newTournament, setNewTournament] = useState('')
  const [updateTournament, setUpdateTournament] = useState('')
  const [deleteTournament, setDeleteTournament] = useState('')
  

  useEffect(() => {
    let mounted = true
    if(mounted){
      dispatch(fetchAllTournament())
    }
    
    return ()=> mounted = false
  }, [dispatch, newTournament, updateTournament, deleteTournament])

  useEffect(() => {
    socket.on("createTournament", (data) => setNewTournament(data === newTournament ? data+'1' : data));

    return ()=> socket.removeAllListeners("createTournament");
  }, [newTournament])

  useEffect(() => {
    socket.on("updateTournament", (data) => setUpdateTournament(data === updateTournament ? data+'1' : data));

    return ()=> socket.removeAllListeners("updateTournament");
  }, [updateTournament])

  useEffect(() => {
    socket.on("deleteTournament", (data) => setDeleteTournament(data === deleteTournament ? data+'1' : data));

    return ()=> socket.removeAllListeners("deleteTournament");
  }, [deleteTournament])

  const ongoingTournament = allTournament.filter(r=> r.status === 'ONGOING')
  const availableTournament = allTournament.filter(r=> new Date(r.startDate).getTime() > Date.now())
  const pastTournament = allTournament.filter(r=> new Date(r.startDate).getTime() < Date.now() && r.status !== 'ONGOING')

  return (
    <>
    {loading ? <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        /> :
        <>
    <div className='tournaments-img'>
    <img loading='lazy' src='https://images.wallpapersden.com/image/download/pubg-key-art_bGVuZ26UmZqaraWkpJRoZ2VlrWZtZWU.jpg' alt=''/>
    <div className='fade'>
      <h1>Step up your game</h1>
      <span>Bertarung dengan pemain lain yang lebih kompetitif</span>
    </div>
    </div>
    <div className='tournaments'>
      {availableTournament.length > 0 &&
      <>
        <h2 className='tournaments-title'>Turnamen</h2>
        <div className='tournament-container'>
          {availableTournament.map(t=>(
            <TournamentCard
            key={t._id}
            _id={t._id}
            tournamentPicture={t.tournamentPicture}
            status={t.status}
            tournamentName={t.tournamentName}
            tournamentFirstPrize={t.tournamentFirstPrize}
            tournamentSecondPrize={t.tournamentSecondPrize}
            tournamentThirdPrize={t.tournamentThirdPrize}
            startDate={t.startDate}
            tournamentMode={t.tournamentMode}
            teams={t.teams}
            maxSlot={t.maxSlot}
            />
          ))}
        </div>
      </>}
      {ongoingTournament?.length > 0 &&
      <>
        <h2 className='tournaments-title'>Turnamen Berlangsung</h2>
        <div className='tournament-container'>
        {ongoingTournament.map(t=>(
          <TournamentCard
            key={t._id}
            _id={t._id}
            tournamentPicture={t.tournamentPicture}
            status={t.status}
            tournamentName={t.tournamentName}
            tournamentFirstPrize={t.tournamentFirstPrize}
            tournamentSecondPrize={t.tournamentSecondPrize}
            tournamentThirdPrize={t.tournamentThirdPrize}
            startDate={t.startDate}
            tournamentMode={t.tournamentMode}
            teams={t.teams}
            maxSlot={t.maxSlot}
          />
          ))}
        </div>
      </>}
      {pastTournament.length > 0 &&
      <>
        <h2 className='tournaments-title'>Past Turnamen</h2>
        <div className='tournament-container'>
        {pastTournament.map(t=>(
          <TournamentCard
          key={t._id}
          _id={t._id}
          tournamentPicture={t.tournamentPicture}
          status={t.status}
          tournamentName={t.tournamentName}
          tournamentFirstPrize={t.tournamentFirstPrize}
          tournamentSecondPrize={t.tournamentSecondPrize}
          tournamentThirdPrize={t.tournamentThirdPrize}
          startDate={t.startDate}
          tournamentMode={t.tournamentMode}
          teams={t.teams}
          maxSlot={t.maxSlot}
          />
        ))}
      </div>
      </>}
    </div>
    </>
      }
    
    </>
  )
}

export default Tournaments
