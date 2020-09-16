import React, { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: null,
  logout: null,
});
