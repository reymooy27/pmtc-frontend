import { createSlice } from '@reduxjs/toolkit'

const initialState = { tournament: [],tournamentTeam: [], tournamentID: '',allTournament: []}

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    getTournamentData(state, action) {
      state.tournament = action.payload
    },
    getTournamentTeam(state, action) {
      state.tournamentTeam = action.payload
    },
    getAllTournament(state, action) {
      state.allTournament = action.payload
    },
  },
})

export const { getTournamentData,getTournamentTeam, getAllTournament,loadingEnd } = tournamentSlice.actions
export const selectTournament = (state) => state.tournament.tournament
export const selectTournamentTeam = (state) => state.tournament.tournamentTeam
export const selectAllTournament = (state) => state.tournament.allTournament
export default tournamentSlice.reducer