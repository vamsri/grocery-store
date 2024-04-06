// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk
export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const data = await response.json();
    return data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(action.payload);
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
