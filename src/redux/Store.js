// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import favoriteReducer from './slices/favouriteSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favorite: favoriteReducer,
    order: orderReducer,
  },
});

export default store;
