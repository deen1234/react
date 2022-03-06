/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  isLogIn,
  isRegister,
  forgetPassword,
  profile,
  myReservation,
  refresh,
  profileEdit,
} from './services';
import { AuthState } from './types';

export const initialState: AuthState = {
  data: null,
  loginErrorMessage: '',
  profileErrorMessage: '',
  isLoading: false,
  isFailure: false,
  user: null,
  profileData: null,
  isLogged: false,
  myReservationData: null,
  // refreshData: null,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    userLogged: (state) => {
      state.isLogged = true;
    },
    userLogout: (state) => {
      state.isLogged = false;
    },
    errorCheck: (state) => {
      state.loginErrorMessage = '';
    },
  },

  extraReducers: {
    [isLogIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [isLogIn.fulfilled.type]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        user: action.payload,
        loginErrorMessage: '',
      };
    },
    [isLogIn.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.loginErrorMessage = action.error.message;
    },

    [profileEdit.pending.type]: (state) => {
      state.isLoading = true;
    },
    [profileEdit.fulfilled.type]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        loginErrorMessage: '',
      };
    },
    [profileEdit.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.loginErrorMessage = action.error.message;
    },
    [profile.pending.type]: (state) => {
      state.isLoading = true;
    },
    [profile.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.profileData = action.payload.data;
      state.profileErrorMessage = action.payload.message;
    },
    [profile.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.profileErrorMessage = action.error.message;
    },

    [myReservation.pending.type]: (state) => {
      state.isLoading = true;
    },
    [myReservation.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.myReservationData = action.payload;
      state.profileErrorMessage = action.payload.message;
    },
    [myReservation.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.profileErrorMessage = action.error.message;
    },

    [refresh.pending.type]: (state) => {
      state.isLoading = true;
    },
    [refresh.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.profileData = action.payload;
      state.loginErrorMessage = '';
    },
    [refresh.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;

      state.loginErrorMessage = action.error.message;
    },
    [forgetPassword.pending.type]: (state) => {
      state.isLoading = true;
    },
    [forgetPassword.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.loginErrorMessage = '';
    },
    [forgetPassword.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.loginErrorMessage = action.error.message;
    },

    [isRegister.pending.type]: (state) => {
      state.isLoading = true;
    },
    [isRegister.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.loginErrorMessage = '';
    },
    [isRegister.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isFailure = true;
      state.loginErrorMessage = action.error.message;
    },
  },
});

export const {
  actions: { userLogged, userLogout, errorCheck },
  reducer,
  name: sliceKey,
} = AuthSlice;
