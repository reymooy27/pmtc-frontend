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
import { closeSideBar, selectErrorMessage, selectOpenErrorSnackbar, selectOpenSuccessSnackbar, setOpenErrorSnackbar, setOpenSuccessSnackbar, selectSuccessMessage } from "./redux/reducers/appSlice";
import UserTeam from './component/UserTeam'
import ProfileSetting from "./component/ProfileSetting";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function App() {
  const dispatch = useDispatch()

  const tournament = useSelector(selectTournament)
  const openSuccessSnackbar = useSelector(selectOpenSuccessSnackbar)
  const openErrorSnackbar = useSelector(selectOpenErrorSnackbar)
  const successMessage = useSelector(selectSuccessMessage)
  const errorMessage = useSelector(selectErrorMessage)

  const [loading, setLoading] = useState(true);

useEffect(() => {
  let mounted = true
  if(mounted){
    dispatch(fetchCheckUser())
    dispatch(fetchAllTournament())
    setLoading(false)
  }
  return ()=> mounted = false
}, [dispatch])

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setOpenSuccessSnackbar(false))
    dispatch(setOpenErrorSnackbar(false))
  };

  return (
    <>
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
            <Route path='/profile/setting'>
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
              <ProfileSetting/>                        
              </div>
            </Route>
            <Route path="/profile/:id">
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
              {tournament.registrationClosed || tournament.status !== 'OPEN' ? (
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

      <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
        {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
