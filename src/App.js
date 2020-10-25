import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import Prize from "./component/Prize";
import Schedule from "./component/Schedule";
import Rules from "./component/Rules";
import Team from "./component/Team";
import Tabs from "./component/Tabs";
import TeamDetail from "./component/TeamDetail";
import KillRangking from "./component/KillRangking";
import Leaderboard from "./component/Leaderboard";
import Registration from "./component/Registration";
import EmailConfirmation from "./component/EmailConfirmation";
import Loader from "react-loader-spinner";
import Login from "./component/Login";
import Admin from "./component/Admin";
import {login} from './redux/reducers/userSlice'
import {getTournamentData, selectTournament} from './redux/reducers/tournamentSlice'
import {useSelector, useDispatch} from 'react-redux'
import axios from './axios'
import Signup from "./component/Signup";
import Profile from "./component/Profile";

function App() {
  const dispatch = useDispatch()

  const tournament = useSelector(selectTournament)

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
   

 useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const req = await axios.post("/tournament/5ef4596040d71032dc8bc81d");
      if (mounted) {
        dispatch(getTournamentData(req.data))
        setLoading(false);
      }
    }
    setTimeout(() => {
      fetchData();
    }, 300);

    return () => (mounted = false);
  }, [dispatch]);

useEffect(() => {
  async function checkAuth(){
    const req = await axios.get('/status')
    if(req.status === 200){
      const r = await axios.post(`user/${req.data.user._id}`)
      dispatch(login(r.data))
      }
  }
  checkAuth()
}, [dispatch])


  const click = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Router>
      {loading ? (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        />
      ) : (
        <Fragment>
          <Switch>
            {/* <Route path="/admin">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                  onClick={() => setOpen(false)}
                  className="main-content-wraper"
                >
                  <Admin />
              </div>
            </Route>
            <Route path="/profile">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                  onClick={() => setOpen(false)}
                  className="main-content-wraper"
                >
                  <Profile />
              </div>
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route> */}
            <Route path="/registration/email-confirmation">
              <EmailConfirmation />
            </Route>
            <Route path="/registration">
              {tournament.registrationClosed ? (
                <Redirect to="/" />
              ) : (
                <Registration />
              )}
            </Route>
            <Route path="/team/teamdetail">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <TeamDetail />
              </div>
            </Route>
            <Route path="/rules">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <Header />
                <Tabs tab={6} />
                <Rules />
              </div>
            </Route>
            <Route path="/killrangking">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <Header />
                <Tabs tab={4} />
                <KillRangking />
              </div>
            </Route>
            <Route path="/leaderboard">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <Header />
                <Tabs tab={3} />
                <Leaderboard />
              </div>
            </Route>
            <Route path="/team">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <Header />
                <Tabs tab={2} />
                <Team />
              </div>
            </Route>
            <Route path="/prize">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <Header />
                <Tabs tab={5} />
                <Prize/>
              </div>
            </Route>
            <Route path="/">
              <Navbar onClick={click} />
              <SideBar open={open} />
              <div
                onClick={() => setOpen(false)}
                className="main-content-wraper"
              >
                <Header />
                <Tabs tab={1} />
                <Schedule />
              </div>
            </Route>
          </Switch>
        </Fragment>
      )}
    </Router>
  );
}

export default App;
