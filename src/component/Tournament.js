import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import SideBar from "./SideBar";
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
import { closeSideBar } from '../redux/reducers/appSlice';
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

  useEffect(() => {
    let mounted = true
    const fetchTournamentData = async ()=>{
      const res = await axios.post(`/tournament/${tournamentID}`)
      if(mounted){
        dispatch(getTournamentData(res.data))
        dispatch(getTournamentTeam(res.data.teams))
        setLoading(false)
      }
    }
    fetchTournamentData()
    return ()=> mounted = false
}, [dispatch,tournamentID,updateTournament,teamRegistered])

useEffect(() => {
    socket.on("updateTournament", (data) => setUpdateTournament(data === updateTournament ? data+'1' : data));

    return ()=> socket.removeAllListeners("updateTournament");
  }, [updateTournament])

useEffect(() => {
    socket.on("registTournament", (data) => setTeamRegistered(data === teamRegistered ? data+'1' : data));

    return ()=> socket.removeAllListeners("registTournament");
  }, [teamRegistered])


  return (
    <>
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
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
          </div>
    </>
  )
}

export default Tournament
