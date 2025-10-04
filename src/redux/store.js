import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'

/**
 * Cấu hình redux-persist
 * https://www.npmjs.com/package/redux-persist
 * https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
 */

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Cấu hình persist
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // các slice dữ liệu DƯỢC PHÉP duy trì qua mỗi lần f5 web
  // blacklist: ['user'] // các slice dữ liệu KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần f5 web
}

// combine reducer
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

// Thực hiện persist reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
