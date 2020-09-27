import { createReducer, createSelector } from '@reduxjs/toolkit';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from 'redux/profile/actions';

const defaultCardState = {
  number: '',
  expireDate: null,
  name: '',
  secretCode: '',
};

const initialState = {
  isLoading: false,
  card: defaultCardState,
  error: null,
};

const profile = createReducer(initialState, {
  [postCardRequest]: (state) => {
    state.isLoading = true;
    state.error = null;
  },
  [postCardSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.card = payload;
    state.error = null;
  },
  [postCardFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.card = defaultCardState;
    state.error = payload;
  },
  [getCardRequest]: (state) => {
    state.isLoading = true;
    state.card = defaultCardState;
    state.error = null;
  },
  [getCardSuccess]: (state, { payload }) => {
    state.isLoading = false;
    state.card = payload;
    state.error = null;
  },
  [getCardFailure]: (state, { payload }) => {
    state.isLoading = false;
    state.card = defaultCardState;
    state.error = payload;
  },
});

export const getIsLoading = createSelector(
  (state) => state.profile.isLoading,
  (isLoading) => isLoading,
);
export const getCard = createSelector(
  (state) => state.profile.card,
  (card) => card,
);

export default profile;
