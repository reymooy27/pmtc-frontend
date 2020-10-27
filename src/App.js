import React, {useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import SideBar from "./component/SideBar";
import TeamDetail from "./component/TeamDetail";
import Registration from "./component/Registration";
import EmailConfirmation from "./component/EmailConfirmation";
import Loader from "react-loader-spinner";
import Login from "./component/Login";
import Admin from "./component/Admin";
import {login} from './redux/reducers/userSlice'
import {getAllTournament, selectTournament} from './redux/reducers/tournamentSlice'
import {useSelector, useDispatch} from 'react-redux'
import axios from './axios'
import Signup from "./component/Signup";
import Profile from "./component/Profile";
import Tournaments from "./component/Tournaments";
import Tournament from "./component/Tournament";
import { closeSideBar } from "./redux/reducers/appSlice";

function App() {
  const dispatch = useDispatch()

  const tournament = useSelector(selectTournament)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let mounted = true

  async function getTournaments(){
    const res = await axios.post('/api/v1/tournaments')
    if(mounted){
      dispatch(getAllTournament(res.data))
      setLoading(false);

    }
  }

  setTimeout(() => {
  getTournaments()
  },300)
  
  return ()=> mounted = false
}, [dispatch])


useEffect(() => {
  async function checkAuth(){
    const req = await axios.get('/status')
    if(req.status === 200){
      const r = await axios.post(`user/${req.data.user._id}`)
      dispatch(login(r.data))
      setLoading(false);
      }
  }
      checkAuth()
}, [dispatch])



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
          <Switch>
            <Route path="/admin">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                  <Admin />
              </div>
            </Route>
            <Route path="/profile">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                  <Profile />
              </div>
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/email-confirmation">
              <EmailConfirmation />
            </Route>
            <Route path="/team/create/:id">
              {tournament.registrationClosed ? (
                <Redirect to="/" />
              ) : (
                <Registration />
              )}
            </Route>
            <Route path="/team/teamdetail">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <TeamDetail />
              </div>
            </Route>
            
            <Route path="/tournament/:id">
              <Tournament />
            </Route>
            <Route path="/">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <Tournaments />
              </div>
            </Route>
          </Switch>
      )}
    </Router>
  );
}

export default App;
