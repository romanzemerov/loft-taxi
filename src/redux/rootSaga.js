import { fork } from 'redux-saga/effects';
import authSaga from 'redux/auth/sagas';
import profileSaga from 'redux/profile/sagas';

export function* rootSaga() {
  yield fork(authSaga);
  yield fork(profileSaga);
}
