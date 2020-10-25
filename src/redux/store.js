import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import tournamentReducer from './reducers/tournamentSlice'

export default configureStore({ reducer: {user: userReducer, tournament : tournamentReducer } })