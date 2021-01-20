import { createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
const initialState = { user: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    checkUser(state,action){
      state.user = action.payload
    },
  },
})

export const { login, logout,checkUser } = userSlice.actions
export const selectUser = (state) => state.user.user

export default userSlice.reducer


export const fetchCheckUser = ()=> async dispatch => {
  try {
    const req = await axios.get('/status')
    if(req.status === 200){
      const r = await axios.get(`user/${req.data.user._id}`)
      dispatch(checkUser(r.data))
      }
  } catch (error) {
    console.log(error);
  }
}

export const fetchLogout = ()=> async dispatch => {
  try {
    await axios.get('/logout')
    dispatch(logout())
  } catch (error) {
    console.log(error);
  }
}

