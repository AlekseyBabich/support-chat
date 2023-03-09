import { createSlice } from '@reduxjs/toolkit'
import { Tokens } from "@src/frontend/pages/api/Token";

export interface AuthState {
  isAuth: boolean
  userName: string | null
  token: string | null
  refreshToken: string | null
  telegramAuthLink: string | null
  status: string | null
  error: string | null
}

const initialState: AuthState = {
  isAuth: false,
  userName: null,
  token: null,
  refreshToken: null,
  telegramAuthLink: null,
  status: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNewUserName: (state, action) => {
      state.userName = action.payload.name
    },
    setTokens: (state, { payload }: { payload: Tokens }) => {
      state.token = payload.accessToken
      state.refreshToken = payload.refreshToken
      if (payload.accessToken) {
        state.isAuth = true
      }
    },
    logout: (state) => {
      state.token = null
      state.refreshToken = null
      state.isAuth = false

    }
  },
})

export const {
  setNewUserName,
  setTokens,
  logout

} = authSlice.actions

export default authSlice.reducer
