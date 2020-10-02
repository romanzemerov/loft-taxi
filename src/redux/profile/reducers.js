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

export const getIsCardLoading = createSelector(
  (state) => state.profile.isLoading,
  (isLoading) => isLoading,
);

export const getIsCardLoaded = createSelector(
  (state) => state.profile.isCardLoaded,
  (isCardLoaded) => isCardLoaded,
);

export const getCard = createSelector(
  (state) => state.profile.card,
  (card) => card,
);

export const getIsCardExist = createSelector(
  (state) => state.profile.card,
  (card) => card !== defaultCardState,
);

export const getCardLoadingError = createSelector(
  (state) => state.profile.error,
  (error) => error,
);

export default profile;
