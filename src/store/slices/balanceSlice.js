import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setBalance, setLoading, setError } = balanceSlice.actions;
export default balanceSlice.reducer;
