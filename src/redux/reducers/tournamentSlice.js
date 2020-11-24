import { createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = { tournament: [],tournamentTeam: [], tournamentID: '',allTournament: [], loading: true}

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
      state.loading = false
    },
    loadingEnd(state){
      state.loading = false
    }
  },
})

export const { getTournamentData,getTournamentTeam, getAllTournament,loadingEnd } = tournamentSlice.actions
export const selectTournament = (state) => state.tournament.tournament
export const selectTournamentTeam = (state) => state.tournament.tournamentTeam
export const selectAllTournament = (state) => state.tournament.allTournament
export const selectLoading = (state) => state.tournament.loading
export default tournamentSlice.reducer

export const fetchAllTournament = ()=> async dispatch => {
  try {
    const res = await axios.post('/api/v1/tournaments')
    dispatch(getAllTournament(res.data))
  } catch (error) {
    console.log(error);
    dispatch(loadingEnd())
  }
}