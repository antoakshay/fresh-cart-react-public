import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import validator from 'validator';
import API_URL from '../../../apiUrl';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        error: err.message || 'Invalid Credentials',
      });
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/users/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        error: err.message || 'Invalid Credentials',
      });
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    email: '',
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    newUser(state, action) {
      console.log(action.payload);
      state.user = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.data) {
          state.user = action.payload.data.name;
          state.email = action.payload.data.email;
        } else {
          console.log('data not found in payload');
        }
        // console.log(action.payload.data);
        state.loading = false;
        // state.user = action.payload.data.name;
        state.isAuthenticated = true;
        console.log(state.isAuthenticated);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
        state.user = '';
        alert(action.payload.message);
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = '';
        state.isAuthenticated = false;
        state.user = '';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Something went wrong while logging out';
        state.isAuthenticated = true;
      });
  },
});

export const { newUser } = userSlice.actions;

export default userSlice.reducer;
