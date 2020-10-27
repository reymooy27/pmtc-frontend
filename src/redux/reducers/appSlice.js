import { createSlice } from '@reduxjs/toolkit'

const initialState = {sideBarOpen: false}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showSideBar(state, action) {
      if(state.sideBarOpen === false){
        state.sideBarOpen = true
      }else{
        state.sideBarOpen = false
      }
    },
    closeSideBar(state){
      state.sideBarOpen = false
    }
  },
})

export const { showSideBar, closeSideBar } = appSlice.actions
export const sideBarOpen = (state) => state.app.sideBarOpen
export default appSlice.reducer