// src/redux/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    recentOrder: null,
  },
  reducers: {
    setOrder: (state, action) => {
      state.recentOrder = action.payload;
    },
    clearOrder: (state) => {
      state.recentOrder = null;
    },
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
