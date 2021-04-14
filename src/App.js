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
import {fetchCheckUser} from './redux/reducers/userSlice'
import {fetchAllTournament} from './redux/reducers/tournamentSlice'
import {useSelector, useDispatch} from 'react-redux'
import Signup from "./component/Signup";
import {selectErrorMessage, selectOpenErrorSnackbar, selectOpenSuccessSnackbar, setOpenErrorSnackbar, setOpenSuccessSnackbar, selectSuccessMessage, selectSearchInput } from "./redux/reducers/appSlice";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment'
import FooterMenu from "./component/FooterMenu";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import MainContent from "./component/MainContent";

function App() {
  
  const dispatch = useDispatch()

  const openSuccessSnackbar = useSelector(selectOpenSuccessSnackbar)
  const openErrorSnackbar = useSelector(selectOpenErrorSnackbar)
  const successMessage = useSelector(selectSuccessMessage)
  const errorMessage = useSelector(selectErrorMessage)
  const input = useSelector(selectSearchInput)

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

const matches = useMediaQuery('(min-width: 976px)')

const useStyles = makeStyles(() => ({
  bottom: {
    bottom: matches ? '8px' : '78px',
  },
}));

  const classes = useStyles()

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

    {input !== '' && <Redirect to='/search'/>}

      {loading ? (
        <Loader
          className="loader"
          type="ThreeDots"
          color="#00DEAB"
          height={120}
          width={120}
        />
      ) : (
        <>
          <Switch>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/email-confirmation" component={EmailConfirmation}/>
            <Route path="/team/create/:id"component={Registration}/>
            <Route path="/" render={(props) => (
              <>
                <Navbar {...props}/>
                <SideBar/>
                <MainContent/>
                <FooterMenu {...props}/> 
              </>
            )}/>
          </Switch>
        </>
      )}
    </Router>

      <Snackbar className={classes.bottom} open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
        {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar className={classes.bottom} open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
