import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from 'redux/rootReducer';
import { rootSaga } from 'redux/rootSaga';
import { loadState, saveState } from 'utils/localStorage';
import { throttle } from 'utils/throttle';

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
