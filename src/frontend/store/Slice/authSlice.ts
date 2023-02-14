import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
  token: string | null
  refreshToken: string | null
  telegramAuthLink: string | null
}

const initialState: AuthState = {
  isAuth: false,
  token: null,
  refreshToken: null,
  telegramAuthLink: null,
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      { payload }: { payload: { secret?: string; refresh?: string } },
    ) => {
      if (payload.secret) {
        state.token = payload.secret
      }
      if (payload.refresh) {
        state.refreshToken = payload.refresh
      }
      state.isAuth = true
    },
  },
})

export const {
setTokens
} = authSlice.actions

export default authSlice.reducer
