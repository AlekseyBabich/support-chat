import { configureStore } from "@reduxjs/toolkit";
import appReducer from './Slice/appSlice'
import authReducer from './Slice/authSlice'

const store = configureStore({
  reducer: {
    messages: appReducer,
    auth: authReducer,
  }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch