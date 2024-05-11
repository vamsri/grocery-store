import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (thunkAPI) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
      'Content-Type': 'application/json',
    };

    const response = await axios.get('http://localhost:4001/api/products', {
      headers,
    });
    return response.data;
  }
);

export const handleCreateProducts = (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
};

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    entities: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    handleCreateProducts(builder);
  },
});

export default productSlice.reducer;
