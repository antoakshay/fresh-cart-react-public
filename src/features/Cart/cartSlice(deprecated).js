import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
      console.log('Updated cart', state.cart);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.price;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.price;

      // Preventing the user to not go back beyond 0,
      // so deleting the item from the cart
      if (item.quantity === 0) {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// for getting the overall cart for checkout
export const getCart = (state) => {
  const cart = state.cart?.cart ?? [];
  return cart;
};

export const getTotalCartQuantity = (state) => {
  const cartItems = state.cart?.cart ?? [];
  // Reduce the items to calculate the total quantity
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
};

//Calculating the quantity of each product,
// If the quantity property is undefined then it returns 0
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;

export const getTotalCartPrice = (state) =>
  // Giving 0 as the starting value & add the totalPrice of each item in the cart
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
