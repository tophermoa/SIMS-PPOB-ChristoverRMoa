import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  profileImage: '',
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profileImage = action.payload.profileImage;
      state.error = null;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.profileImage = '';
    },
  },
});

export const { setProfile, setProfileImage, setLoading, setError, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
