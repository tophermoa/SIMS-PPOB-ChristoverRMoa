import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
  offset: 0, // first offset 0
  limit: 5, // max 5 item
  hasMore: true,
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
      state.error = null;
    },
    appendHistory: (state, action) => {
      state.history = [...state.history, ...action.payload];
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetHistory: (state) => {
      state.history = [];
      state.offset = 0;
      state.hasMore = true;
    },
  },
});

export const {
  setHistory,
  appendHistory,
  setOffset,
  setHasMore,
  setLoading,
  setError,
  resetHistory,
} = transactionSlice.actions;
export default transactionSlice.reducer;
