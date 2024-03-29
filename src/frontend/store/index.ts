import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from './Slice/appSlice'
import authReducer from './Slice/authSlice'
import chatSlice from "@src/frontend/store/Slice/chatSlice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat: chatSlice,
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
    })
})

export const persistor = persistStore(store)
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//window.store = store