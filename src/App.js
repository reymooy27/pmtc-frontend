import React, { Fragment, useContext, useState } from "react";
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
import { StateContext } from "./StateProvider";

function App() {
  const value = useContext(StateContext);

  const [open, setOpen] = useState(false);

  const click = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <Router>
      {value.loading ? (
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
            <Route path="/registration/email-confirmation">
              <EmailConfirmation />
            </Route>
            <Route path="/registration">
              {value.data_.registrationClosed ? (
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
                <Prize />
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
