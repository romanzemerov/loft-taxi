import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from 'redux/auth/reducers';
import profile from 'redux/profile/reducers';
import { logout } from 'redux/auth/actions';
import { authMiddleware } from 'redux/auth/middleware';
import { loadState, saveState } from 'utils/localStorage';
import { throttle } from 'utils/throttle';
import { profileMiddleware } from 'redux/profile/middleware';

const appReducer = combineReducers({ auth, profile });
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const previousState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  preloadedState: previousState,
});

sagaMiddleware.run(rootSaga);

store.subscribe(throttle(() => saveState(store.getState()), 1000));
