import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CustomerService from '../../Services/CustomerService';

// Thunk for fetching memberships
export const fetchMemberships = createAsyncThunk(
  'memberships/fetchMemberships',
  async () => {
    const response = await CustomerService.getMemberships();
    return response.data.map((item) => ({
      ...item,
      popularityScore: Math.floor(Math.random() * 101),
      status: ['increasing', 'same', 'decreasing'][Math.floor(Math.random() * 3)],
    }));
  }
);

// Thunk for updating a membership
export const updateMembership = createAsyncThunk(
  'memberships/updateMembership',
  async ({ id, data }) => {
    const response = await CustomerService.updateMembership(id, data);
    return response.data;
  }
);

const membershipSlice = createSlice({
  name: 'memberships',
  initialState: {
    memberships: [],
    loading: false,
    error: null,
    editRowIndex: null,
    updatedPrice: null,
    isModalOpen: false,
    rowToSave: null,
  },
  reducers: {
    setEditRowIndex: (state, action) => {
      state.editRowIndex = action.payload;
    },
    setUpdatedPrice: (state, action) => {
      state.updatedPrice = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setRowToSave: (state, action) => {
      state.rowToSave = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemberships.pending, (state) => {
        console.log("Fetching memberships...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberships.fulfilled, (state, action) => {
        console.log("Fetched memberships:", action.payload);
        state.loading = false;
        state.memberships = action.payload;
      })
      .addCase(fetchMemberships.rejected, (state, action) => {
        console.log("Error fetching memberships:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMembership.fulfilled, (state, action) => {
        console.log("Updated membership:", action.payload);
        const index = state.memberships.findIndex(
          (item) => item.membershipId === action.payload.membershipId
        );
        if (index !== -1) {
          state.memberships[index] = action.payload;
        }
        state.editRowIndex = null;
        state.updatedPrice = null;
        state.isModalOpen = false;
      });
  },
});

export const {
  setEditRowIndex,
  setUpdatedPrice,
  setIsModalOpen,
  setRowToSave,
} = membershipSlice.actions;

export default membershipSlice.reducer;
