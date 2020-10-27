import { createSlice } from '@reduxjs/toolkit'

const initialState = { tournament: [], tournamentID: '',allTournament: [] }

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    getTournamentData(state, action) {
      state.tournament = action.payload
    },
    getTournamentID(state, action) {
      state.tournamentID = action.payload
    },
    getAllTournament(state, action) {
      state.allTournament = action.payload
    },
    
  },
})

export const { getTournamentData, getTournamentID, getAllTournament } = tournamentSlice.actions
export const selectTournament = (state) => state.tournament.tournament
export const selectTournamentID = (state) => state.tournament.tournamentID
export const selectAllTournament = (state) => state.tournament.allTournament
export default tournamentSlice.reducer