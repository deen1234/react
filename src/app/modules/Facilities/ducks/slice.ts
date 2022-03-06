/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { bookedFacility, getAvailableFacility, getAvailableFacilityById } from './services';
import { FacilityState } from './types';

export const initialState: FacilityState = {
  availableFacilityStatus: false,
  availableFacilityErrorMessage: '',
  isLoading: false,
  isFailure: false,
  facilitiesData: [],
  avalibleFacilitiesData: null,
  bookedFacilityData: null,
};

const getAvailableFacilitySlice = createSlice({
  name: 'availableFacility',
  initialState,
  reducers: {},

  extraReducers: {
    // getAvailableFacility

    [getAvailableFacility.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAvailableFacility.fulfilled.type]: (state, action) => {
      state.isLoading = false;

      state.facilitiesData = action.payload;
      state.availableFacilityErrorMessage = '';
    },
    [getAvailableFacility.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.availableFacilityErrorMessage = action.error.message;
    },

    // getAvailableFacilityById

    [getAvailableFacilityById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAvailableFacilityById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.avalibleFacilitiesData = action.payload;
      state.availableFacilityErrorMessage = '';
    },
    [getAvailableFacilityById.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.availableFacilityErrorMessage = action.error.message;
    },

    // bookedFacility

    [bookedFacility.pending.type]: (state) => {
      state.isLoading = true;
    },
    [bookedFacility.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.bookedFacilityData = action.payload;
      // state.availableFacilityErrorMessage = '';
    },
    [bookedFacility.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      // state.availableFacilityErrorMessage = action.error.message;
    },
  },
});

export const {
  actions: availableFacilityAction,
  reducer,
  name: sliceKey,
} = getAvailableFacilitySlice;

// for async action follow blow link
// https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks
// OR
// https://redux-toolkit.js.org/api/createAsyncThunk
