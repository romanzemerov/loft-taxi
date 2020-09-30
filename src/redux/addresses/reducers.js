import { createReducer, createSelector } from '@reduxjs/toolkit';
import {
  getAddressesRequest,
  getAddressesSuccess,
  getAddressesFailure,
} from 'redux/addresses/actions';

const initialState = {
  isLoading: false,
  list: [],
  error: null,
};

const addresses = createReducer(initialState, {
  [getAddressesRequest]: (state) => {
    state.isLoading = true;
    state.list = [];
    state.error = null;
  },
  [getAddressesSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.list = payload;
    state.error = null;
  },
  [getAddressesFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.list = [];
    state.error = payload;
  },
});

export const getIsLoading = createSelector(
  (state) => state.addresses.isLoading,
  (isLoading) => isLoading,
);

export const getAddresses = createSelector(
  (state) => state.addresses.list,
  (list) => list,
);

export const getIsAddressesLoaded = createSelector(
  (state) => state.addresses.list,
  (list) => !!list.length,
);

export default addresses;
