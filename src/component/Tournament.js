import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Header from "./Header";
import Prize from "./Prize";
import Overview from "./Overview";
import Rules from "./Rules";
import Team from "./Team";
import Tabs from "./Tabs";
import KillRangking from "./KillRangking";
import Leaderboard from "./Leaderboard";
import { useDispatch } from 'react-redux';
import {getTournamentData, getTournamentTeam } from '../redux/reducers/tournamentSlice';
import Loader from "react-loader-spinner";
import TournamentTeam from './TournamentTeam';
import axios from '../axios'
import socket from '../socket.io'

function Tournament() {
  const dispatch = useDispatch()

  let { path } = useRouteMatch();
  let {tournamentID} = useParams()

  const [loading, setLoading] = useState(true)
  const [updateTournament, setUpdateTournament] = useState('')
  const [teamRegistered, setTeamRegistered] = useState('')
  const [teamUpdated, setTeamUpdated] = useState('')

  useEffect(() => {
    let mounted = true
    const fetchTournamentData = async ()=>{
      const res = await axios.get(`/tournament/${tournamentID}`)
      if(mounted){
        dispatch(getTournamentData(res.data))
        dispatch(getTournamentTeam(res.data.teams))
        setLoading(false)
      }
    }
    fetchTournamentData()
    return ()=> mounted = false
}, [dispatch,tournamentID,updateTournament,teamRegistered,teamUpdated])

useEffect(() => {
    socket.on("updateTournament", (data) => setUpdateTournament(data === updateTournament ? data+'1' : data));

    return ()=> socket.removeAllListeners("updateTournament");
  }, [updateTournament])

useEffect(() => {
    socket.on("registTournament", (data) => setTeamRegistered(data === teamRegistered ? data+'1' : data));

    return ()=> socket.removeAllListeners("registTournament");
  }, [teamRegistered])

  useEffect(() => {
    socket.on("updateTeam", (data) => setTeamUpdated(data === teamUpdated ? data+'1' : data));

    return ()=> socket.removeAllListeners("updateTeam");
  }, [teamUpdated])

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
          <Switch>
            <Route exact path={path}>
                <Header />
                <Tabs tab={1}/>
                <Overview />
            </Route>
            <Route path="/tournament/:tournamentID/team/:teamID">
                <TournamentTeam />
            </Route>
            <Route path="/tournament/:id/rules">
                <Header />
                <Tabs tab={6}/>
                <Rules />
            </Route>
            <Route path="/tournament/:id/killrangking">
                <Header />
                <Tabs tab={4}/>
                <KillRangking />
            </Route>
            <Route path="/tournament/:id/leaderboard">
                <Header />
                <Tabs tab={3}/>
                <Leaderboard />
            </Route>
            <Route path="/tournament/:id/team">
                <Header />
                <Tabs tab={2}/>
                <Team />
            </Route>
            <Route path="/tournament/:id/prize">
                <Header />
                <Tabs tab={5}/>
                <Prize/>
            </Route>
            <Route path="/tournament/:id/overview">
                <Header />
                <Tabs tab={1}/>
                <Overview />
            </Route>
          </Switch>
          </>}
    </>
  )
}

export default Tournament
