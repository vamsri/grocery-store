import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchCategory = createAsyncThunk(
  'category/fetchByCategory',
  async (thunkAPI) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const headers = {
      Authorization: `Bearer ${token}`,
      'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
      'Content-Type': 'application/json',
    };
    const response = await axios.get(`${apiUrl}/categories`, {
      headers,
    });
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  'category/add',
  async (catPayload, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.post(
        `${apiUrl}/categories`,
        { ...catPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Tenant-ID': '661a6b052ce9f34f30fb9d1a',
          },
        }
      );
      toast.success('category uploaded sucessfully', {
        position: 'top-center',
        theme: 'dark',
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
