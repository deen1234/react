/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import axios from 'utils/axios';
import { BASE_URL } from 'configs';

// const BaseUrl = `https://hotel.shaghr.sa/api/v1/config`;
export const getConfig = createAsyncThunk('config', async (thunkAPI) => {
  const response = await axios({
    url: `${BASE_URL}/config`,
    method: 'GET',
  });
  console.log('coonnnnnnnnnnnnnnnnnnnnnn', response);
  return response.data;
});
