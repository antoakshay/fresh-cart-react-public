import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_URL from '../../../apiUrl';

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ productId, quantity }, thunkAPI) => {
    console.log(JSON.stringify({ productId: productId, quantity: quantity }));
    try {
      const response = await fetch(`${API_URL}/api/v1/cart/updateCart`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: productId, quantity: quantity }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log(data.data[0]);
      return data.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const getCartDetails = createAsyncThunk(
  'cart/getCartDetails',
  async (thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/cart/getCartById`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// !! Currently not supported
export const deleteProduct = createAsyncThunk(
  'cart/deleteProduct',
  async ({ productId }, thunkAPI) => {
    console.trace(productId);
    try {
      const response = await fetch(`${API_URL}/api/v1/cart/removeProduct`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId: productId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    clearCart(state, action) {
      (state.items = []), (state.totalPrice = 0), (state.totalQuantity = 0);
    },
  },
  extraReducers: (builder) => {
    // !! reducer functions for updateItemQuantity API call
    builder
      .addCase(updateItemQuantity.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;

        state.items = action.payload.products;

        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message;
      });
    // !! reducer functions for deleteProduct API call
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(state.items);
        state.status = 'succeeded';
        state.loading = false;
        console.log(action.payload.products);
        state.items = action.payload.products;

        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getCartDetails.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;

        state.items = action.payload.products;

        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = action.payload.totalQuantity;
      })
      .addCase(getCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.items = [];
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
