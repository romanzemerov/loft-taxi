import { createReducer } from '@reduxjs/toolkit';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
  resetUpdateCard,
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
  isUpdated: false,
  error: null,
};

const profile = createReducer(initialState, {
  [postCardRequest]: (state) => {
    state.isLoading = true;
    state.isCardLoaded = false;
    state.isUpdated = false;
    state.error = null;
  },
  [postCardSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.isCardLoaded = true;
    state.isUpdated = true;
    state.card = payload;
  },
  [postCardFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.isCardLoaded = false;
    state.card = defaultCardState;
    state.isUpdated = false;
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
  [resetUpdateCard]: (state) => {
    state.isUpdated = false;
  },
});

export default profile;
