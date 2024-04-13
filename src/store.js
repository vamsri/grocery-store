// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './features/auth/authSlice';
import counterReducer from './features/counter/counterSlice';
import usersReducer from './features/users/userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  counter: counterReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
