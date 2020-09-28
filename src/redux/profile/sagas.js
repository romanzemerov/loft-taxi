import { takeEvery, call, put, fork } from 'redux-saga/effects';
import {
  getCardFailure,
  getCardRequest,
  getCardSuccess,
  postCardFailure,
  postCardRequest,
  postCardSuccess,
} from 'redux/profile/actions';
import { postCard, getCard } from 'utils/Api';

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

function* postCardSaga(action) {
  try {
    const response = yield call(postCard, action.payload);
    const { data } = response;
    const { success, error } = data;

    if (success) {
      yield put(postCardSuccess(transformCardProperties(action.payload)));
    } else {
      yield put(postCardFailure(error));
    }
  } catch (error) {
    yield put(postCardFailure(error));
  }
}

function* getCardSaga(action) {
  try {
    const response = yield call(getCard, action.payload);
    const { data } = response;
    const { error } = data;

    if (!error) {
      yield put(getCardSuccess(transformCardProperties(data)));
    } else {
      yield put(getCardFailure(error));
    }
  } catch (error) {
    yield put(getCardFailure(error));
  }
}

function* profileWatch() {
  yield takeEvery(postCardRequest, postCardSaga);
  yield takeEvery(getCardRequest, getCardSaga);
}

export default function* () {
  yield fork(profileWatch);
}
