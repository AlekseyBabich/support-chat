import { configureStore } from "@reduxjs/toolkit";
import appReducer from './Slice/appSlice'

const store = configureStore({
  reducer: {
    messages: appReducer,
  }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch