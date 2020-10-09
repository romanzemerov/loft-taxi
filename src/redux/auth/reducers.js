import { createReducer } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  clearError,
  logout,
} from 'redux/auth/actions';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

const auth = createReducer(initialState, {
  [loginRequest]: (state) => {
    state.isLoading = true;
    state.isLoggedIn = false;
    state.user = null;
    state.error = null;
  },
  [loginSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.user = payload.user;
  },
  [loginFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.user = null;
    state.error = payload;
  },
  [registerRequest]: (state) => {
    state.isLoading = true;
    state.isLoggedIn = false;
    state.user = null;
    state.error = null;
  },
  [registerSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.user = payload.user;
  },
  [registerFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.user = null;
    state.error = payload;
  },
  [clearError]: (state) => {
    state.error = null;
  },
  [logout]: (state) => {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.user = null;
    state.error = null;
  },
});

export default auth;
