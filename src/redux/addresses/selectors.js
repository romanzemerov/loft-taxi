import { createSelector } from '@reduxjs/toolkit';

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
