import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'configs';
import {
  forgetPasswordProps,
  isLoginProps,
  isRegisterProps,
  isRefreshProps,
  isProfileEditProps,
} from './types';

export const isLogIn = createAsyncThunk('login', async ({ body, onSuccess }: isLoginProps) => {
  const form_data = new FormData();
  form_data.append('email', body.email);
  form_data.append('password', body.password);
  form_data.append('device_type', body.device_type);
  const url = `${BASE_URL}/login`;
  try {
    const response = await axios({
      url,
      method: 'POST',
      data: form_data,
      autoHeaderVariant: true,
    });

    if (onSuccess) {
      onSuccess(response);
    }
    return response.data;
  } catch (error) {
    console.log('error =>', error.response.status, error);
    throw new Error(error.response.status);
  }
});

export const profileEdit = createAsyncThunk(
  'profile',
  async ({ name, phone, onSuccess }: isProfileEditProps) => {
    const form_data = new FormData();
    form_data.append('name', name);
    form_data.append('phone', phone);
    const url = `${BASE_URL}/profile`;
    try {
      const response = await axios({
        url,
        method: 'POST',
        data: form_data,
        headerVariant: 'authorization',
      });
      if (onSuccess) {
        onSuccess(response);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);

export const profile = createAsyncThunk('me', async () => {
  const url = `${BASE_URL}/me`;
  const response = await axios({
    url,
    method: 'GET',
    headerVariant: 'authorization',
  });
  return response;
});

export const refresh = createAsyncThunk('refresh', async ({ onSuccess }: isRefreshProps) => {
  const url = `${BASE_URL}/refresh`;
  const response = await axios({
    url,
    method: 'POST',
    headerVariant: 'authorization',
  });
  if (onSuccess) {
    onSuccess(response);
  }
  return response.data;
});

export const myReservation = createAsyncThunk('my-reservations', async () => {
  const url = `${BASE_URL}/my-reservations`;
  const response = await axios({
    url,
    method: 'GET',
    headerVariant: 'authorization',
  });
  return response.data;
});

export const forgetPassword = createAsyncThunk(
  'reset-password',
  async ({ email, onSuccess }: forgetPasswordProps) => {
    const form_data = new FormData();

    form_data.append('email', email);

    const url = `${BASE_URL}/reset-password`;

    try {
      const response = await axios({
        url,
        method: 'POST',
        data: form_data,
        autoHeaderVariant: true,
      });
      if (onSuccess) {
        onSuccess(response);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error);
      throw new Error(error.response.status);
    }
  },
);
export const isRegister = createAsyncThunk(
  'register',
  async ({ email, phone, name, device_type, onSuccess }: isRegisterProps) => {
    const form_data = new FormData();

    form_data.append('email', email);
    form_data.append('phone', phone);
    form_data.append('name', name);
    form_data.append('device_type', device_type);

    const url = `${BASE_URL}/register`;

    try {
      const response = await axios({
        url,
        method: 'POST',
        data: form_data,
        autoHeaderVariant: true,
      });
      if (onSuccess) {
        onSuccess(response);
      }
      return response.data;
    } catch (error) {
      console.log('error =>', error.response.status);
      throw new Error(error.response.status);
    }
  },
);
