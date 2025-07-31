import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('/products.json');
  const data = await res.json();
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => { s.loading = true; })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.items = a.payload;
        s.loading = false;
      })
      .addCase(fetchProducts.rejected, (s) => { s.loading = false; });
  }
});

export default productSlice.reducer;
