import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import tournamentReducer from './reducers/tournamentSlice'
import appReducer from './reducers/appSlice'
import chatReducer from './reducers/chatSlice'
export default configureStore({ reducer: {user: userReducer, tournament : tournamentReducer, app: appReducer, chat: chatReducer} })