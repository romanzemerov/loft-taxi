import API from 'utils/API';

import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from 'redux/auth/actions';

export const authMiddleware = (store) => (next) => (action) => {
  if (action.type === loginRequest.type) {
    API.post('/auth', action.payload)
      .then(({ data }) => {
        const { success, token, error } = data;
        if (success) {
          const { email } = action.payload;
          const user = { email, token };
          store.dispatch(loginSuccess({ user }));
        } else {
          store.dispatch(loginFailure(error));
        }
      })
      .catch((error) => {
        store.dispatch(loginFailure(error));
      });
  }

  if (action.type === registerRequest.type) {
    API.post('/register', action.payload)
      .then(({ data }) => {
        const { success, token, error } = data;
        if (success) {
          const { email } = action.payload;
          const user = { email, token };
          store.dispatch(registerSuccess({ user }));
        } else {
          store.dispatch(registerFailure(error));
        }
      })
      .catch((error) => {
        store.dispatch(registerFailure(error));
      });
  }

  return next(action);
};
