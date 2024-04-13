// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: false,
  },
  reducers: {
    onLoginSuccess: (state, action) => {
      state.value = true;
    },
    onLogout: (state, action) => {
      state.value = false;
    },
  },
});

export const { onLoginSuccess, onLogout } = authSlice.actions;

export default authSlice.reducer;
