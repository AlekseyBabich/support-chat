import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from './Slice/appSlice'
import authReducer from './Slice/authSlice'


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch