import React from 'react'
import { useDispatch } from 'react-redux'
import { closeSideBar, showSideBar } from '../../redux/reducers/appSlice'
import Admin from '../Admin/Admin'
import Chat from '../Chat/Chat'
import ChatList from '../Chat/ChatList'
import Notification from '../Notification/Notification'
import Profile from '../Profile/Profile'
import ProfileSetting from '../Profile/ProfileSetting'
import Search from '../Search/Search'
import Tournament from '../Tournament/Tournament'
import Tournaments from '../Tournament/Tournaments'
import UserTeam from '../UserTeam/UserTeam'
import { useSwipeable } from "react-swipeable";
import {
  Switch,
  Route,
} from "react-router-dom";

function MainContent() {

  const dispatch = useDispatch()

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => dispatch(showSideBar()),
    onSwipedLeft: ()=> dispatch(closeSideBar())
  });

  return (
    <div className="main-content-wraper" onClick={()=> dispatch(closeSideBar())}>
      <Switch>
        <Route path="/admin" component={Admin}/>
        <Route path="/search" component={Search}/>
        <Route path="/notification" component={Notification}/>
        <Route path="/chat/:id" component={Chat}/>
        <Route path="/chat" component={ChatList}/>
        <Route path="/profile/team/:id" component={UserTeam}/>
        <Route path='/profile/setting' component={ProfileSetting}/>
        <Route path="/profile/:id" component={Profile}/>
        <Route path="/tournament/:tournamentID" component={Tournament}/>
        <Route path="/">
          <div {...handlers}  >
            <Tournaments/>
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default MainContent
