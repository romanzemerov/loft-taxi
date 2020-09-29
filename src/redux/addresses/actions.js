import { createAction } from '@reduxjs/toolkit';

export const getAddressesRequest = createAction('GET_ADDRESSES_REQUEST');
export const getAddressesSuccess = createAction('GET_ADDRESSES_SUCCESS');
export const getAddressesFailure = createAction('GET_ADDRESSES_FAILURE');
