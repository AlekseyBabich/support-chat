import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from './Slice/appSlice'
import authReducer from './Slice/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { signUpApi } from "@src/frontend/pages/api/queryApi/signUpApi";


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  [signUpApi.reducerPath]: signUpApi.reducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(signUpApi.middleware),
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch