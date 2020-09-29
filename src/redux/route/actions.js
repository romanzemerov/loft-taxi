import { createAction } from '@reduxjs/toolkit';

export const getRouteRequest = createAction('GET_ROUTE_REQUEST');
export const getRouteSuccess = createAction('GET_ROUTE_SUCCESS');
export const getRouteFailure = createAction('GET_ROUTE_FAILURE');
export const resetRoute = createAction('RESET_ROUTE');
