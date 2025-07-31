import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ✅ Works on both localhost and GitHub Pages
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/products.json`);
  if (!res.ok) {
    throw new Error('❌ Failed to fetch products.json');
  }
  const data = await res.json();
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error('❌ Product fetch failed:', action.error.message);
      });
  },
});

export default productSlice.reducer;
