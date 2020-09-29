import { combineReducers } from '@reduxjs/toolkit';
import auth from 'redux/auth/reducers';
import profile from 'redux/profile/reducers';
import addresses from 'redux/addresses/reducers';
import { logout } from 'redux/auth/actions';

const appReducer = combineReducers({ auth, profile, addresses });
export const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }

  return appReducer(state, action);
};
