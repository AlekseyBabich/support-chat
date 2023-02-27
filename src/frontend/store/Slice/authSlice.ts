import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from "@src/frontend/pages/api/helpers/axios";
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

/*export const signUpAT = createAsyncThunk(
  'auth/signUpAT',
  async function (username: string) {
    const response = await instance.post('/signUp', {userName: username})
    const data = await response.data
    if(!data) return
    const link = await instance.post('/getAuthLoginLink', {
        userId: data.id
    })
    window.location.href = link.data.body

    return // link.data.body
  }
)*/


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
      if(payload.accessToken) {
        state.isAuth = true
      }
    },
    logout: (state) => {
      state.token = null
      state.refreshToken = null
      state.isAuth = false

    }
  },
 /* extraReducers: {
    [signUpAT.pending.type]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [signUpAT.fulfilled.type]: (state, action) => {
      state.status = 'resolver'
      state.userName = action.payload.userName
    },
    [signUpAT.rejected.type]: (state, action) => {
      state.error = 'Какая то ошибка'
    },
  }*/
})

export const {
  setNewUserName,
  setTokens,
  logout

} = authSlice.actions

export default authSlice.reducer
