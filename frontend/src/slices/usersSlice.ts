import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  email: string;
  name: string;
  _id: string;
}

interface InitialState {
  loading: boolean;
  user: User | null;
  error: object | null;
  data: object | null;
}

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null,
  data: null,
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (disptachData: object, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/auth', disptachData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Use AxiosError to get access to response and other properties
        return rejectWithValue(
          error.response.data.message || 'An error occurred'
        );
      } else {
        // Handle other types of errors
        return rejectWithValue('An error occurred');
      }
    }
  }
);
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const res = await axios.post('/api/users/logout');
  localStorage.removeItem('user');
  return res;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (dispatchData: object, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', dispatchData);
      localStorage.setItem('users', JSON.stringify(data));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Use AxiosError to get access to response and other properties
        return rejectWithValue(
          error.response.data.message || 'An error occurred'
        );
      } else {
        // Handle other types of errors
        return rejectWithValue('An error occurred');
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (dispatchData: object, { rejectWithValue }) => {
    try {
      const { data } = await axios.put('/api/users/profile', dispatchData);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || 'An error occurred'
        );
      } else {
        return rejectWithValue('An error occurred');
      }
    }
  }
);

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || null;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = null;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || null;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload || null;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload || null;
    });
  },
});

export default usersSlice.reducer;
