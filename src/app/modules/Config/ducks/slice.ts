/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from './services';
import { ConfigState } from './types';

export const initialState: ConfigState = {
  configStatus: false,
  configErrorMessage: '',
  isLoading: false,
  isFailure: false,
  data: null,
};

const getConfigSlice = createSlice({
  name: 'Config',
  initialState,
  reducers: {},

  extraReducers: {
    [getConfig.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getConfig.fulfilled.type]: (state, action) => {
      state.isLoading = false;

      state.data = action.payload.data;
      state.configErrorMessage = '';
    },
    [getConfig.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.configErrorMessage = action.error.message;
    },
  },
});

export const { actions: configAction, reducer, name: sliceKey } = getConfigSlice;
