import { takeEvery, call, put, fork } from 'redux-saga/effects';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  registerFailure,
  registerRequest,
  registerSuccess,
} from 'redux/auth/actions';
import { executeAuthorization, register } from 'utils/api';
import { deleteState } from 'utils/localStorage';

function* loginSaga(action) {
  try {
    const response = yield call(executeAuthorization, action.payload);
    const { data } = response;
    const { success, token, error } = data;

    if (success) {
      const { email } = action.payload;
      const user = { email, token };
      yield put(loginSuccess({ user }));
    } else {
      yield put(loginFailure(error));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(register, action.payload);
    const { data } = response;
    const { success, token, error } = data;

    if (success) {
      const { email } = action.payload;
      const user = { email, token };
      yield put(registerSuccess({ user }));
    } else {
      yield put(registerFailure(error));
    }
  } catch (error) {
    yield put(registerFailure(error));
  }
}

function* logoutSaga() {
  yield deleteState();
}

function* authWatch() {
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(registerRequest, registerSaga);
  yield takeEvery(logout, logoutSaga);
}

export default function* () {
  yield fork(authWatch);
}
