import { fork } from 'redux-saga/effects';
import authSaga from 'redux/auth/sagas';
import profileSaga from 'redux/profile/sagas';
import addressesSaga from 'redux/addresses/sagas';

export function* rootSaga() {
  yield fork(authSaga);
  yield fork(profileSaga);
  yield fork(addressesSaga);
}
