import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import SideBar from "./SideBar";
import Prize from "./Prize";
import Schedule from "./Schedule";
import Rules from "./Rules";
import Team from "./Team";
import Tabs from "./Tabs";
import KillRangking from "./KillRangking";
import Leaderboard from "./Leaderboard";
import axios from '../axios'
import { useDispatch } from 'react-redux';
import { getTournamentData, getTournamentID } from '../redux/reducers/tournamentSlice';
import Loader from "react-loader-spinner";
import { closeSideBar } from '../redux/reducers/appSlice';


function Tournament() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  let { path, url } = useRouteMatch();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const req = await axios.post(url);
      if (mounted) {
        dispatch(getTournamentData(req.data))
        dispatch(getTournamentID(req.data._id))
        setLoading(false)
      }
    }
    setTimeout(() => {
      fetchData();
    }, 300);

    return () => (mounted = false);
  }, [dispatch,url]);

  console.log(url);
  
  return (
    <div>
      {loading ? <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        /> :<Switch>
        <Route exact path={path}>
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={1}/>
            <Schedule />
          </div>
        </Route>
        <Route path="/tournament/:id/rules">
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={6}/>
            <Rules />
          </div>
        </Route>
        <Route path="/tournament/:id/killrangking">
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={4}/>
            <KillRangking />
          </div>
        </Route>
        <Route path="/tournament/:id/leaderboard">
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={3}/>
            <Leaderboard />
          </div>
        </Route>
        <Route path="/tournament/:id/team">
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={2}/>
            <Team />
          </div>
        </Route>
        <Route path="/tournament/:id/prize">
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={5}/>
            <Prize/>
          </div>
        </Route>
        <Route path="/tournament/:id/schedule">
          <Navbar/>
          <SideBar/>
          <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
            <Header />
            <Tabs tab={1}/>
            <Schedule />
          </div>
        </Route>
      </Switch>}
    </div>
  )
}

export default Tournament
