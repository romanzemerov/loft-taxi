import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import Login from 'components/Login';
import { AuthContext } from 'contexts/AuthContext';

describe('Login', () => {
  let handleChangePageMock;
  let getByTestId;

  beforeEach(() => {
    handleChangePageMock = jest.fn();

    const authContextValue = {
      isLoggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const queries = render(
      <AuthContext.Provider value={authContextValue}>
        <Login handleChangePage={handleChangePageMock} />
      </AuthContext.Provider>,
    );

    getByTestId = queries.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    expect(getByTestId('link')).toBeInTheDocument();
    expect(getByTestId('input-email')).toBeInTheDocument();
    expect(getByTestId('input-password')).toBeInTheDocument();
    expect(getByTestId('login-button')).toBeInTheDocument();
  });

  it('updates email input on change', () => {
    const emailInput = getByTestId('input-email');

    fireEvent.change(emailInput, { target: { value: 'test-email' } });
    expect(emailInput.value).toBe('test-email');
  });

  it('updates password input on change', () => {
    const passwordInput = getByTestId('input-password');

    fireEvent.change(passwordInput, { target: { value: 'test-password' } });
    expect(passwordInput.value).toBe('test-password');
  });

  it('should call callback after submit', () => {
    const loginButton = getByTestId('login-button');

    fireEvent.click(loginButton);
    expect(handleChangePageMock).toHaveBeenCalled();
  });

  it('should call callback after clicking on the link', () => {
    const link = getByTestId('link');

    fireEvent.click(link);
    expect(handleChangePageMock).toHaveBeenCalled();
  });
});
