/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'configs';
import { BookingParams, RoomBookingParams } from './types';

export const getFacilityBookingsById = createAsyncThunk(
  'amenity-bookings/id',
  async (id: string) => {
    const url = `${BASE_URL}/amenity-bookings/${id}`;
    try {
      const response = await axios({
        url,
        method: 'GET',
      });
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const getRoomBookingsById = createAsyncThunk('room-bookings/id', async (id: number) => {
  const url = `${BASE_URL}/room-bookings/${id}`;
  try {
    const response = await axios({
      url,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    console.log('error =>', error.response.status);
    throw new Error(error.response.status);
  }
});

export const getRoomBookingsByOrderNum = createAsyncThunk(
  'room-bookings/order-num',
  async ({ order_no, onSuccess }: RoomBookingParams) => {
    const url = `${BASE_URL}/room-bookings`;
    try {
      const response = await axios({
        url,
        method: 'GET',
        params: { order_no },
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const getFacilityBookingsByOrderNum = createAsyncThunk(
  'facility-bookings/order-num',
  async ({ order_no, onSuccess }: RoomBookingParams) => {
    const url = `${BASE_URL}/amenity-bookings`;
    try {
      const response = await axios({
        url,
        method: 'GET',
        params: { order_no },
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const cancelRoomBookingsById = createAsyncThunk(
  'cancel-room-bookings/id',
  async ({ id, onSuccess }: BookingParams) => {
    const url = `${BASE_URL}/cancel-room-booking/${id}`;
    try {
      const response = await axios({
        url,
        method: 'GET',
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const cancelFacilityBookingsById = createAsyncThunk(
  'cancel-bookings/id',
  async ({ id, onSuccess }: BookingParams) => {
    const url = `${BASE_URL}/cancel-amenity-booking/${id}`;
    try {
      const response = await axios({
        url,
        method: 'GET',
      });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);
