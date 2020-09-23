import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'redux/auth/reducers';
import { authMiddleware } from 'redux/auth/middleware';
import { loadState, saveState } from 'utils/localStorage';
import { throttle } from 'utils/throttle';

const previousState = loadState();
const middlewares = [authMiddleware];

export const store = configureStore({
  reducer: authReducer,
  middleware: middlewares,
  preloadedState: previousState,
});

store.subscribe(throttle(() => saveState(store.getState()), 1000));
