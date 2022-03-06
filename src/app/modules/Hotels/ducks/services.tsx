/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'configs';
import { GetHotelParams } from 'app/modules/Hotels/ducks/types';

export const getFiltredHotels = createAsyncThunk(
  'filtred-hotels',
  async (params: GetHotelParams) => {
    const url = `${BASE_URL}/get-hotels-for-filtered-rooms`;
    try {
      const response = await axios({
        url,
        method: 'GET',
        params,
      });
      console.log('zzzzzzzzzzzzzzz  map data ', response.data);
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const getAllHotels = createAsyncThunk('getHotels', async () => {
  const url = `${BASE_URL}/hotels`;
  try {
    const response = await axios({
      url,
      method: 'GET',
    });
    console.log('no filter map data ', response.data);
    return response.data;
  } catch (error) {
    console.log('error =>', error.response.status);
    throw new Error(error.response.status);
  }
});
