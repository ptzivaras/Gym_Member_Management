import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from '../../Services/CustomerService';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, { signal }) => {
  const response = await CustomerService.getCustomers(signal);
  return response.data.map(customer => ({
    ...customer,
    id: customer.customerId, // Use customerId from backend as id
    status: Math.random() > 0.5 ? 'Active' : 'Inactive',
  }));
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerId, { getState, dispatch }) => {
  await CustomerService.deleteCustomer(customerId);
  return customerId;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter(customer => customer.customerId !== action.payload);
      });
  },
});

export default customerSlice.reducer;
