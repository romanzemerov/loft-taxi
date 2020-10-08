import { createSelector } from '@reduxjs/toolkit';
import { defaultCardState } from 'redux/profile/reducers';

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
