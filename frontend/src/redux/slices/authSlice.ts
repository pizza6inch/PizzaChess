import { createSlice } from '@reduxjs/toolkit'

// import {} from './types'

type user = {
  username: string
  displayName: string
  rating: number
} | null

type InitialState = {
  user: user
}

const initialState: InitialState = {
  user: null,
}

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser: (state, action: { type: string; payload: user }) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions

export default authSlice
