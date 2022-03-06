/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'configs';
import { GetRoomParams } from 'app/modules/Facilities/ducks/types';
import { bookedPara } from './types';

export const getAvailableRooms = createAsyncThunk(
  'available-room',
  async (params: GetRoomParams) => {
    const url = `${BASE_URL}/room-availabilities`;
    try {
      const response = await axios({
        url,
        method: 'GET',
        params,
      });
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const getAvailableRoomsById = createAsyncThunk('available-room/id', async (id: string) => {
  const url = `${BASE_URL}/room-availabilities/${id}`;
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

export const bookedRoom = createAsyncThunk('book-room', async ({ body, onSuccess }: bookedPara) => {
  const form_data = new FormData();
  form_data.append('room_availability_id', body.room_availability_id.toString());
  form_data.append('total_rooms', body.total_rooms.toString());
  form_data.append('adult', body.adult.toString());
  form_data.append('check_in', body.check_in);
  form_data.append('child', body.child.toString());
  form_data.append('customer_email', body.customer_email);
  form_data.append('customer_name', body.customer_name);
  form_data.append('customer_phone', body.customer_phone);
  form_data.append('date', body.date);
  form_data.append('slot_time', body.slot_time.toString());
  form_data.append('user_id', body?.user_id?.toString() || '');

  const url = `${BASE_URL}/room-bookings`;
  try {
    const response = await axios({
      url,
      method: 'POST',
      data: form_data,
      autoHeaderVariant: true,
      // headerVariant: 'authorization',
    });
    if (onSuccess) {
      onSuccess(response.data);
    }
    return response.data;
  } catch (error) {
    console.log('error =>', error.response.status);
    throw new Error(error.response.status);
  }
});

export const getHotelTaxesById = createAsyncThunk('getHotelTaxesById', async (hotel_id: string) => {
  const url = `${BASE_URL}/hotel-taxes`;
  try {
    const response = await axios({
      url,
      method: 'GET',
      params: { hotel_id },
    });
    return response.data;
  } catch (error) {
    console.log('error =>', error.response.status);
    throw new Error(error.response.status);
  }
});
