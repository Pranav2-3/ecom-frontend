import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(i => i.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        toast.info(`${existingItem.name} quantity increased`, { icon: '➕' });
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success(`${action.payload.name} added to cart`, { icon: '🛒' });
      }
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      state.items = state.items.filter(i => i.id !== action.payload);
      if (item) {
        toast.error(`${item.name} removed from cart`, { icon: '❌' });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        toast.info(`Updated quantity of ${item.name} to ${quantity}`, { icon: '🔁' });
      }
    },
    clearCart: (state) => {
      state.items = [];
      toast.success(`Cart cleared successfully`, { icon: '🧹' });
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
