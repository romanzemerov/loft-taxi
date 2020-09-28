import API from 'utils/API';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from 'redux/profile/actions';

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

export const profileMiddleware = (store) => (next) => (action) => {
  if (action.type === postCardRequest.type) {
    API.post('/card', action.payload)
      .then(({ data }) => {
        const { success, error } = data;
        if (success) {
          store.dispatch(
            postCardSuccess(transformCardProperties(action.payload)),
          );
        } else {
          store.dispatch(postCardFailure(error));
        }
      })
      .catch((error) => {
        store.dispatch(postCardFailure(error));
      });
  }

  if (action.type === getCardRequest.type) {
    API.get(`/card?token=${action.payload.token}`)
      .then(({ data }) => {
        const { error } = data;
        if (!error) {
          store.dispatch(getCardSuccess(transformCardProperties(data)));
        } else {
          store.dispatch(getCardFailure(error));
        }
      })
      .catch((error) => {
        store.dispatch(getCardFailure(error));
      });
  }

  return next(action);
};
