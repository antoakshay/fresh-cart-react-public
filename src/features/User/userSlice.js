import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://192.168.43.117:7000/api/v1/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        },
      );
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
      const response = await fetch(
        'https://192.168.43.117:7000/api/v1/users/logout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        },
      );

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
    loading: false,
    error: null,
    isAuthenticated: false,
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
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = '';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong while logging out";
        state.isAuthenticated = true;
      });
  },
});

export default userSlice.reducer;
