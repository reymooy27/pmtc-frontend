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
import Chat from "./component/Chat";
import ChatList from './component/ChatList'
import Notification from "./component/Notification";
import moment from 'moment'
function App() {
  const dispatch = useDispatch()

  const tournament = useSelector(selectTournament)
  const openSuccessSnackbar = useSelector(selectOpenSuccessSnackbar)
  const openErrorSnackbar = useSelector(selectOpenErrorSnackbar)
  const successMessage = useSelector(selectSuccessMessage)
  const errorMessage = useSelector(selectErrorMessage)

  const [loading, setLoading] = useState(true);

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

moment.updateLocale('id', {
    calendar : {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at]',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    }
});

moment.updateLocale('id', {
    months : [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
        "Augustus", "September", "Oktober", "November", "Desember"
    ]
});
moment.updateLocale('id', {
    weekdays : [
        "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    ]
});

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
            <Route path="/notification">
              <Navbar backButton={true}/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <Notification/>
              </div>
            </Route>
            <Route path="/chat/:id">
              <Navbar isChat={true} backButton={true}/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <Chat/>
              </div>
            </Route>
            <Route path="/chat">
              <Navbar/>
              <SideBar/>
              <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
                <ChatList/>
              </div>
            </Route>
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
