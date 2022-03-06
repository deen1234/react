/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getAllHotels, getFiltredHotels } from './services';
import { HotelState } from './types';

export const initialState: HotelState = {
  isLoading: false,
  isFailure: false,
  hotelErrorMessage: '',
  hotels: [],
};

const HotelSlice = createSlice({
  name: 'getHotels',
  initialState,
  reducers: {},

  extraReducers: {
    [getAllHotels.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllHotels.fulfilled.type]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        hotels: action.payload,
        hotelErrorMessage: '',
      };
    },
    [getAllHotels.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.hotelErrorMessage = action.error.message;
    },
    //  get getFiltredHotels
    [getFiltredHotels.pending.type]: (state) => {
      console.log('data  from filtered Hotals');
      state.isLoading = true;
    },
    [getFiltredHotels.fulfilled.type]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        hotels: action.payload,
        hotelErrorMessage: '',
      };
    },
    [getFiltredHotels.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.hotelErrorMessage = action.error.message;
    },
  },
});

export const { actions, reducer, name: sliceKey } = HotelSlice;
