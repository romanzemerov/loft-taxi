import { createSelector } from '@reduxjs/toolkit';

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

export const getError = createSelector(
  (state) => state.auth.error,
  (error) => error,
);
