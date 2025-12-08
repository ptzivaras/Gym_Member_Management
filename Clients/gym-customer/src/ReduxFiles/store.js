import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/CustomerSlice';
import membershipReducer from './slices/membershipSlice';

const store = configureStore({
  reducer: {
    customers: customerReducer,
    memberships: membershipReducer,
  },
});

export default store;
