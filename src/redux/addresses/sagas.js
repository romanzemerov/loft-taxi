import { takeEvery, call, put } from 'redux-saga/effects';
import { getAddressesData } from 'utils/api';
import {
  getAddressesFailure,
  getAddressesRequest,
  getAddressesSuccess,
} from 'redux/addresses/actions';

export function* getAddressesSaga() {
  try {
    const response = yield call(getAddressesData);
    const { data } = response;
    yield put(getAddressesSuccess(data.addresses));
  } catch ({ message }) {
    yield put(getAddressesFailure(message));
  }
}

export default function* () {
  yield takeEvery(getAddressesRequest, getAddressesSaga);
}
