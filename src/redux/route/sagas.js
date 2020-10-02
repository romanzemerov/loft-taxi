import { takeEvery, call, put } from 'redux-saga/effects';
import { getRouteData } from 'utils/api';
import {
  getRouteRequest,
  getRouteSuccess,
  getRouteFailure,
} from 'redux/route/actions';

export function* getRouteSaga(action) {
  try {
    const response = yield call(getRouteData, action.payload);
    const { data } = response;
    yield put(getRouteSuccess(data));
  } catch ({ message }) {
    yield put(getRouteFailure(message));
  }
}

export default function* () {
  yield takeEvery(getRouteRequest, getRouteSaga);
}
