import { createSlice } from '@reduxjs/toolkit'

const initialState = {toRecipient: null}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setToRecipient(state, action) {
      state.toRecipient = action.payload
    },
  },
})

export const { setToRecipient} = chatSlice.actions
export const selectToRecipient = (state) => state.chat.toRecipient

export default chatSlice.reducer