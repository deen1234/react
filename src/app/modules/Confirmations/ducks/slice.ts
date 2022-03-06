/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getFacilityBookingsById,
  getFacilityBookingsByOrderNum,
  getRoomBookingsById,
  getRoomBookingsByOrderNum,
} from './services';
import { BookingState } from './types';

export const initialState: BookingState = {
  bookingStatus: false,
  bookingErrorMessage: '',
  isLoading: false,
  isFailure: false,
  roomBookingData: null,
  facilityBookingData: null,
};

const getBookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},

  extraReducers: {
    // getRoomBookingsById

    [getRoomBookingsById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getRoomBookingsById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.roomBookingData = action.payload;
      state.bookingErrorMessage = '';
    },
    [getRoomBookingsById.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.bookingErrorMessage = action.error.message;
    },

    // getFacilityBookingsById

    [getFacilityBookingsById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getFacilityBookingsById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.facilityBookingData = action.payload;
      state.bookingErrorMessage = '';
    },
    [getFacilityBookingsById.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.bookingErrorMessage = action.error.message;
    },

    // getRoomBookingsByOrderNum

    [getRoomBookingsByOrderNum.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getRoomBookingsByOrderNum.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.roomBookingData = action.payload;
      state.bookingErrorMessage = '';
    },
    [getRoomBookingsByOrderNum.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.bookingErrorMessage = 'Booking not found';
    },

    // getFacilityBookingsByOrderNum

    [getFacilityBookingsByOrderNum.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getFacilityBookingsByOrderNum.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.facilityBookingData = action.payload;
      state.bookingErrorMessage = '';
    },
    [getFacilityBookingsByOrderNum.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.bookingErrorMessage = 'Booking not found';
    },
  },
});

export const { actions: bookingsAction, reducer, name: sliceKey } = getBookingsSlice;

// for async action follow blow link
// https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks
// OR
// https://redux-toolkit.js.org/api/createAsyncThunk
