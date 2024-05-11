import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (thunkAPI) => {
    try {
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
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        theme: 'dark',
      });
    }
  }
);

export const createProducts = createAsyncThunk(
  'products/createProducts',
  async (prodPayload, thunkAPI) => {
    try {
      const {
        productName,
        productPrice,
        productDescription,
        id,
        productStock,
      } = prodPayload;
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
      };
      const response = await axios.post(
        'http://localhost:4001/api/products',
        {
          name: productName,
          price: productPrice,
          description: productDescription,
          categories: id,
          inventoryCount: productStock,
        },
        { headers }
      );
      thunkAPI.dispatch(fetchProducts());
      console.log('POST request successful:', response.data);
      toast.success('product updated sucessfully', {
        position: 'top-center',
        theme: 'dark',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message, {
        position: 'top-center',
        theme: 'dark',
      });
    }
  }
);

export const handleFetchProducts = (builder) => {
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

export const handleCreateProducts = (builder) => {
  builder
    .addCase(createProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(createProducts.fulfilled, (state, action) => {
      state.entities.push(action.payload);
      state.loading = false;
    })
    .addCase(createProducts.rejected, (state, action) => {
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
    handleFetchProducts(builder);
    handleCreateProducts(builder);
  },
});

export default productSlice.reducer;
