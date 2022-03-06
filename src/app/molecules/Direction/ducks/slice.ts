import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFromLocal } from 'utils/cache';
import { ContainerState } from './types';

export const directions: any = {
  en: 'ltr',
  ar: 'rtl',
};
// The initial state of the direction container
export const defaultLang: string = getFromLocal('i18nextLng', false) || 'en';
export const initialState: ContainerState = {
  language: defaultLang || 'en',
  direction: directions[defaultLang] || 'ltr',
};
const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<any>) {
      state.language = action.payload || 'en'; // eslint-disable-line
      state.direction = directions[action.payload] || 'ltr'; // eslint-disable-line
    },
  },
});

export const { actions: directionActions, reducer, name: sliceKey } = directionSlice;
