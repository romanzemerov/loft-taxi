import { takeEvery, call, put, fork } from 'redux-saga/effects';
import {
  getCardFailure,
  getCardRequest,
  getCardSuccess,
  postCardFailure,
  postCardRequest,
  postCardSuccess,
} from 'redux/profile/actions';
import { setCardData, getCardData } from 'utils/api';

const transformCardProperties = ({
  cardNumber,
  expiryDate,
  cardName,
  cvc,
}) => ({
  number: cardNumber,
  expireDate: expiryDate,
  name: cardName,
  secretCode: cvc,
});

export function* setCardDataSaga(action) {
  try {
    const response = yield call(setCardData, action.payload);
    const { data } = response;
    const { success, error } = data;

    if (success) {
      yield put(postCardSuccess(transformCardProperties(action.payload)));
    } else {
      yield put(postCardFailure(error));
    }
  } catch ({ message }) {
    yield put(postCardFailure(message));
  }
}

export function* getCardDataSaga(action) {
  try {
    const response = yield call(getCardData, action.payload);
    const { data } = response;
    const { error } = data;

    if (!error) {
      yield put(getCardSuccess(transformCardProperties(data)));
    } else {
      yield put(getCardFailure(error));
    }
  } catch ({ message }) {
    yield put(getCardFailure(message));
  }
}

function* profileWatch() {
  yield takeEvery(postCardRequest, setCardDataSaga);
  yield takeEvery(getCardRequest, getCardDataSaga);
}

export default function* () {
  yield fork(profileWatch);
}
