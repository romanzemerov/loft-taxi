import { createAction } from '@reduxjs/toolkit';

export const postCardRequest = createAction('POST_CARD_REQUEST');
export const postCardSuccess = createAction('POST_CARD_SUCCESS');
export const postCardFailure = createAction('POST_CARD_FAILURE');

export const getCardRequest = createAction('GET_CARD_REQUEST');
export const getCardSuccess = createAction('GET_CARD_SUCCESS');
export const getCardFailure = createAction('GET_CARD_FAILURE');

export const resetUpdateCard = createAction('RESET_UPDATE_CARD');
