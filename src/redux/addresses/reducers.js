import { createReducer } from '@reduxjs/toolkit';
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
  },
  [getAddressesFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.list = [];
    state.error = payload;
  },
});

export default addresses;
