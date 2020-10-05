import { createReducer, createSelector } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
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
  [logout]: (state) => {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.user = null;
    state.error = null;
  },
});

export const getIsLoggedIn = createSelector(
  (state) => state.auth.isLoggedIn,
  (isLoggedIn) => isLoggedIn,
);

export const getIsLoading = createSelector(
  (state) => state.auth.isLoading,
  (isLoading) => isLoading,
);

export const getUserToken = createSelector(
  (state) => state.auth.user,
  ({ token }) => token,
);

export default auth;
