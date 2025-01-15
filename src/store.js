import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage
import cartReducer from './features/Cart/cartSlice';
import userReducer from './features/User/userSlice';
import { useSelector } from 'react-redux';



const cartPersistConfig = {
  key: 'cart',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
};

// Only persist the cart state
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer, // Persisted cart reducer
    user: persistedUserReducer, // Non-persisted user reducer
  },
});

const persistor = persistStore(store); 

export { store, persistor };
