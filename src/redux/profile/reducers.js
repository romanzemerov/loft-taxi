import { createReducer } from '@reduxjs/toolkit';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from 'redux/profile/actions';

export const defaultCardState = {
  number: '',
  expireDate: null,
  name: '',
  secretCode: '',
};

const initialState = {
  isLoading: false,
  card: defaultCardState,
  isCardLoaded: false,
  error: null,
};

const profile = createReducer(initialState, {
  [postCardRequest]: (state) => {
    state.isLoading = true;
    state.isCardLoaded = false;
    state.error = null;
  },
  [postCardSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.isCardLoaded = true;
    state.card = payload;
  },
  [postCardFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.isCardLoaded = false;
    state.card = defaultCardState;
    state.error = payload;
  },
  [getCardRequest]: (state) => {
    state.isLoading = true;
    state.isCardLoaded = false;
    state.card = defaultCardState;
    state.error = null;
  },
  [getCardSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.isCardLoaded = true;
    state.card = payload;
  },
  [getCardFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.isCardLoaded = false;
    state.card = defaultCardState;
    state.error = payload;
  },
});

export default profile;
