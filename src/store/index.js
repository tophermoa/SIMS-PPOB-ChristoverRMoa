import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import balanceReducer from './slices/balanceSlice';
import serviceReducer from './slices/serviceSlice';
import transactionReducer from './slices/transactionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    balance: balanceReducer,
    service: serviceReducer,
    transaction: transactionReducer,
  },
});

export default store;
