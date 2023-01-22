import React, { useEffect, useState } from 'react'
import './Tournaments.css'
import {getAllTournament, selectAllTournament} from '../../redux/reducers/tournamentSlice'
import {useDispatch, useSelector } from 'react-redux'
import TournamentCard from './TournamentCard'
import socket from '../../socket.io'
import img from '../../img/PGI.S-Key-Art-4.png'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../axios'
import { useMediaQuery } from '@material-ui/core'
import { Fragment } from 'react'


function Tournaments() {

  const matches = useMediaQuery('(min-width: 680px)')
  
  const useStyles = makeStyles(() => ({
    skeleton:{
      backgroundColor: '#0E1013',
      height: '160px',
      width: matches ? '300px' : '100%',
      borderRadius: '10px',
      margin: matches ? '10px' : '0 auto'
    }
  }))
  
  const classes = useStyles()

  document.title = `Home`

  const allTournament = useSelector(selectAllTournament)
  const dispatch = useDispatch()

  const [newTournament, setNewTournament] = useState('')
  const [updateTournament, setUpdateTournament] = useState('')
  const [deleteTournament, setDeleteTournament] = useState('')
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    let mounted = true
    setLoading(true)
    const fetchTournament = async ()=>{
      await axios.get('/api/v1/tournaments')
      .then(res=>{
        if(mounted){
          dispatch(getAllTournament(res.data))
          setLoading(false)
        }})
        .catch(err=>{
          console.log(err)
          setLoading(true)
        })
      }
      setTimeout(() => {
        fetchTournament()
      }, 500);

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

  const allTourney = [
  {
    name: 'Turnamen',
    tournament: availableTournament
  },
  {
    name: 'Turnamen Berlangsung',
    tournament: ongoingTournament
  },
  {
    name: 'Past Turnamen',
    tournament: pastTournament
  },
  ]

  return (
    <>
      <div className='t--header'>
        <img src={img} alt='img' loading='lazy' />
        <div className='fade1'>
          <h1>Online soon</h1>
          <h1 className='h1--grey'>Build your <span>team</span></h1>
          <h6>more details</h6>
        </div>
      </div>

      <div className='tournaments'>
        {allTourney.map((data,i)=>(
          <Fragment key={i}>
              <>
                <h2 className='tournaments-title'>{data?.name}</h2>
                <div className='tournament-container'>
                  {(loading ? Array.from(new Array(6)) : data?.tournament).map((t,x)=>(
                    <Fragment key={x}>
                      {loading ? <Skeleton className={classes.skeleton} variant='rect' animation="wave"/> : 
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
                      }
                    </Fragment>
                  ))}
                </div>
              </>
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default Tournaments
