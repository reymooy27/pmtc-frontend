import { createSlice } from '@reduxjs/toolkit'

const initialState = { tournament: [] }

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    getTournamentData(state, action) {
      state.tournament = action.payload
    },
    
  },
})

export const { getTournamentData } = tournamentSlice.actions
export const selectTournament = (state) => state.tournament.tournament
export default tournamentSlice.reducer