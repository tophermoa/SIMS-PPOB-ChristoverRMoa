import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  banners: [],
  loading: false,
  error: null,
  servicesSelected: null
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
      state.error = null;
    },
    setServicesSelected: (state, action) => {
      state.servicesSelected = action.payload;
    },
    setBanners: (state, action) => {
      state.banners = action.payload;
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

export const { setServices, setBanners, setLoading, setError, setServicesSelected } = serviceSlice.actions;
export default serviceSlice.reducer;
