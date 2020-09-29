import { createReducer, createSelector } from '@reduxjs/toolkit';
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
    state.error = null;
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

export const getIsLoading = createSelector(
  (state) => state.addresses.isLoading,
  (isLoading) => isLoading,
);

export const getRoute = createSelector(
  (state) => state.route.coords,
  (coords) => coords,
);

export default route;
