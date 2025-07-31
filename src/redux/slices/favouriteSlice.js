// src/redux/slices/favoriteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      const exists = state.items.find(i => i.id === item.id);
      if (exists) {
        state.items = state.items.filter(i => i.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
