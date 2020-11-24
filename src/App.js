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
import Registration from "./component/Registration";
import EmailConfirmation from "./component/EmailConfirmation";
import Loader from "react-loader-spinner";
import Login from "./component/Login";
import Admin from "./component/Admin";
import {fetchCheckUser} from './redux/reducers/userSlice'
import {fetchAllTournament, selectTournament} from './redux/reducers/tournamentSlice'
import {useSelector, useDispatch} from 'react-redux'
import Signup from "./component/Signup";
import Profile from "./component/Profile";
import Tournaments from "./component/Tournaments";
import Tournament from "./component/Tournament";
import { closeSideBar } from "./redux/reducers/appSlice";
import UserTeam from './component/UserTeam'

function App() {
  const dispatch = useDispatch()

  const tournament = useSelector(selectTournament)

  const [loading, setLoading] = useState(true);

useEffect(() => {
  dispatch(fetchCheckUser())
  setLoading(false)
}, [dispatch])

useEffect(() => {
    dispatch(fetchAllTournament())
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
            <Route path="/profile/team/:id">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <UserTeam/>
              </div>
            </Route>
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
            <Route path="/tournament/:tournamentID">
              <Tournament />
            </Route>
            <Route path="/">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <Tournaments loading={loading} />
              </div>
            </Route>
          </Switch>
      )}
    </Router>
  );
}

export default App;
