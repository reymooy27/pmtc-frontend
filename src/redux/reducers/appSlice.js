import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideBarOpen: false, 
  successMessage: '', 
  errorMessage: '', 
  openSuccessSnackbar: false, 
  openErrorSnackbar: false,
  searchInput: ''
}

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
    },
    setOpenSuccessSnackbar(state, action){
      state.openSuccessSnackbar = action.payload
    },
    setOpenErrorSnackbar(state, action){
      state.openErrorSnackbar = action.payload
    },
    setSuccessMessage(state, action){
      state.successMessage = action.payload
    },
    setErrorMessage(state, action){
      state.errorMessage = action.payload
    },
    setSearchInput(state, action){
      state.searchInput = action.payload
    }
  },
})

export const { 
  showSideBar, 
  closeSideBar, 
  setOpenSuccessSnackbar, 
  setOpenErrorSnackbar, 
  setSuccessMessage, 
  setErrorMessage,
  setSearchInput 
} = appSlice.actions

export const sideBarOpen = (state) => state.app.sideBarOpen
export const selectOpenSuccessSnackbar = (state) => state.app.openSuccessSnackbar
export const selectOpenErrorSnackbar = (state) => state.app.openErrorSnackbar
export const selectSuccessMessage = (state) => state.app.successMessage
export const selectErrorMessage = (state) => state.app.errorMessage
export const selectSearchInput = (state) => state.app.searchInput

export default appSlice.reducer