/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  bookedRoom,
  getAvailableRooms,
  getAvailableRoomsById,
  getHotelTaxesById,
} from './services';
import { RoomState } from './types';

export const initialState: RoomState = {
  availableRoomStatus: false,
  availableRoomErrorMessage: '',
  isLoading: false,
  isFailure: false,
  roomsData: [],
  avalibleRoomsData: null,
  bookedRoomData: null,
  hotelTax: null,
};

const getAvailableRoomSlice = createSlice({
  name: 'AvailableRoom',
  initialState,
  reducers: {},

  extraReducers: {
    // getAvailableRooms

    [getAvailableRooms.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAvailableRooms.fulfilled.type]: (state, action) => {
      state.isLoading = false;

      state.roomsData = action.payload;
      state.availableRoomErrorMessage = '';
    },
    [getAvailableRooms.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.availableRoomErrorMessage = action.error.message;
    },

    // getAvailableRoomsById

    [getAvailableRoomsById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAvailableRoomsById.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.avalibleRoomsData = action.payload;
      state.availableRoomErrorMessage = '';
    },
    [getAvailableRoomsById.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.availableRoomErrorMessage = action.error.message;
    },

    // bookedRoom

    [bookedRoom.pending.type]: (state) => {
      state.isLoading = true;
      // return { ...state, isLoading: true };
    },
    [bookedRoom.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.bookedRoomData = action.payload;
      // state.availableRoomErrorMessage = '';
    },
    [bookedRoom.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      // state.availableRoomErrorMessage = action.error.message;
    },

    // get hotel taxs by id

    [getHotelTaxesById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getHotelTaxesById.fulfilled.type]: (state, action) => {
      state.isLoading = false;

      state.hotelTax = action.payload;
      // state.configErrorMessage = '';
    },
    [getHotelTaxesById.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      // state.configErrorMessage = action.error.message;
    },
  },
});

export const { actions: availableRoomAction, reducer, name: sliceKey } = getAvailableRoomSlice;
