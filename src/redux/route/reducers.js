import { createReducer } from '@reduxjs/toolkit';
import {
  getRouteRequest,
  getRouteSuccess,
  getRouteFailure,
  resetRoute,
} from 'redux/route/actions';

const initialState = {
  isLoading: false,
  coords: null,
  error: null,
};

const route = createReducer(initialState, {
  [getRouteRequest]: (state) => {
    state.isLoading = true;
    state.coords = null;
    state.error = null;
  },
  [getRouteSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.coords = payload;
  },
  [getRouteFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.coords = null;
    state.error = payload;
  },
  [resetRoute]: (state) => {
    state.isLoading = false;
    state.coords = null;
    state.error = null;
  },
});

export default route;
