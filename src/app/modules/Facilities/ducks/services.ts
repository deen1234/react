/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'configs';
import { bookedPara, GetFacilityParams } from './types';

export const getAvailableFacility = createAsyncThunk(
  'available-facility',
  async (params: GetFacilityParams) => {
    const url = `${BASE_URL}/amenity-availabilities`;
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

export const getAvailableFacilityById = createAsyncThunk(
  'available-facility/id',
  async (id: string) => {
    const url = `${BASE_URL}/amenity-availabilities/${id}`;
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

export const bookedFacility = createAsyncThunk(
  'book-facility',
  async ({ body, onSuccess }: bookedPara) => {
    const form_data = new FormData();

    form_data.append('amenity_availability_id', body.amenity_availability_id.toString());
    form_data.append('adult', body.adult.toString());
    form_data.append('check_in', body.check_in);
    form_data.append('child', body.child.toString());
    form_data.append('customer_email', body.customer_email);
    form_data.append('customer_name', body.customer_name);
    form_data.append('customer_phone', body.customer_phone);
    form_data.append('date', body.date);
    form_data.append('slot_time', body.slot_time.toString());
    form_data.append('user_id', body?.user_id?.toString() || '');

    const url = `${BASE_URL}/amenity-bookings`;

    try {
      const response = await axios({
        url,
        method: 'POST',
        data: form_data,
        autoHeaderVariant: true,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.date;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);
