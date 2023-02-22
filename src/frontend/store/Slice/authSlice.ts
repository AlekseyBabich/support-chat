import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from "@src/frontend/pages/api/helpers/axios";

export interface AuthState {
  isAuth: boolean
  token: string | null
  refreshToken: string | null
  telegramAuthLink: string | null
  status: string | null
  error: string | null
}

const initialState: AuthState = {
  isAuth: false,
  token: null,
  refreshToken: null,
  telegramAuthLink: null,
  status: null,
  error: null,
}

export const signUpAT = createAsyncThunk(
  'auth/signUpAT',
  async function () {
    const response = await instance.post('/signUp')
    const data = await response.data
    if(!data) return
    const link = await instance.post('/getAuthLoginLink', {
        userId: data.id
    })
    window.location.href = link.data.body
    return // link.data.body
  }
)


const authSlice = createSlice({
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
  extraReducers: {
    [signUpAT.pending.type]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [signUpAT.fulfilled.type]: (state, action) => {
      state.status = 'resolver'
      state.token = action.payload
      state.refreshToken = action.payload
    },
    [signUpAT.rejected.type]: (state, action) => {
      state.error = 'Какая то ошибка'
    },
  }
})

export const {
setTokens
} = authSlice.actions

export default authSlice.reducer
