import { createSelector } from '@reduxjs/toolkit';

export const getIsLoading = createSelector(
  (state) => state.route.isLoading,
  (isLoading) => isLoading,
);

export const getRoute = createSelector(
  (state) => state.route.coords,
  (coords) => coords,
);
