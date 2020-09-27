import API from 'utils/API';

import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from 'redux/profile/actions';

export const profileMiddleware = (store) => (next) => (action) => {
  console.log(action.type);
  if (action.type === postCardRequest.type) {
    API.post('/card', action.payload)
      .then(({ data }) => {
        const { success, error } = data;
        if (success) {
          console.log(action.payload);
          const { cardNumber, expiryDate, cardName, cvc } = action.payload;
          store.dispatch(
            postCardSuccess({
              number: cardNumber,
              expireDate: expiryDate,
              name: cardName,
              secretCode: cvc,
            }),
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
    API.get(`/card?token=${action.payload.token}`).then(({ data }) => {
      const { cardNumber, expiryDate, cardName, cvc } = data;
      store.dispatch(
        getCardSuccess({
          number: cardNumber,
          expireDate: expiryDate,
          name: cardName,
          secretCode: cvc,
        }),
      );
    });
  }

  return next(action);
};
