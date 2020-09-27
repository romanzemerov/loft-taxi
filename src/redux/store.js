import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from 'redux/auth/reducers';
import profile from 'redux/profile/reducers';

import { authMiddleware } from 'redux/auth/middleware';
import { loadState, saveState } from 'utils/localStorage';
import { throttle } from 'utils/throttle';
import { profileMiddleware } from 'redux/profile/middleware';

const reducer = combineReducers({ auth, profile });
const previousState = loadState();
const middlewares = [authMiddleware, profileMiddleware];

export const store = configureStore({
  reducer,
  middleware: middlewares,
  preloadedState: previousState,
});

store.subscribe(throttle(() => saveState(store.getState()), 1000));
