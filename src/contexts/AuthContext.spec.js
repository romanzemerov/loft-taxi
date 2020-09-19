import React, { useContext } from 'react';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AuthContext, AuthProvider } from 'contexts/AuthContext';

describe('AuthContext', () => {
  let isLoggedIn, login, logout;

  beforeEach(() => {
    const TestComponent = () => {
      const value = useContext(AuthContext);
      isLoggedIn = value.isLoggedIn;
      login = value.login;
      logout = value.logout;

      return null;
    };

    const Wrapper = () => (
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    render(<Wrapper />);
  });

  afterEach(() => {
    cleanup();
  });

  it("sets 'isLoggedIn' default value to false", () => {
    expect(isLoggedIn).toBe(false);
  });

  it("sets 'isLoggedIn' to true", () => {
    act(() => {
      login('email', 'password');
    });
    expect(isLoggedIn).toBe(true);
  });

  it("sets 'isLoggedIn' to false", () => {
    act(() => {
      login('email', 'password');
    });
    act(() => {
      logout();
    });
    expect(isLoggedIn).toBe(false);
  });
});
