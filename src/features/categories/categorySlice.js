import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategory = createAsyncThunk(
  'category/fetchByCategory',
  async (thunkAPI) => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
      'Content-Type': 'application/json',
    };
    const response = await axios.get(`http://localhost:4001/api/categories`, {
      headers,
    });
    console.log('data->', response.data);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  'category/add',
  async (catPayload, thunkAPI) => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      'http://localhost:4001/api/categories',
      { ...catPayload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
        },
      }
    );
    return response.data;
  }
);

export const handleFetchCategory = (builder) => {
  builder
    .addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    })
    .addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};

export const handleAddCategory = (builder) => {
  builder
    .addCase(addCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.push(action.payload);
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    entities: [],
    loading: false,
    error: null,
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    handleFetchCategory(builder);
    handleAddCategory(builder);
  },
});

export default categorySlice.reducer;
