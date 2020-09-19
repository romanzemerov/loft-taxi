import React from 'react';
import Signup from 'components/Signup';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { AuthContext } from 'contexts/AuthContext';

describe('Signup', () => {
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
        <Signup handleChangePage={handleChangePageMock} />
      </AuthContext.Provider>,
    );

    getByTestId = queries.getByTestId;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    expect(getByTestId('link')).toBeTruthy();
    expect(getByTestId('input-email')).toBeTruthy();
    expect(getByTestId('input-password')).toBeTruthy();
    expect(getByTestId('input-name')).toBeTruthy();
    expect(getByTestId('input-surname')).toBeTruthy();
    expect(getByTestId('signup-button')).toBeTruthy();
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

  it('updates name input on change', () => {
    const passwordInput = getByTestId('input-name');

    fireEvent.change(passwordInput, { target: { value: 'test-name' } });
    expect(passwordInput.value).toBe('test-name');
  });

  it('updates surname input on change', () => {
    const passwordInput = getByTestId('input-surname');

    fireEvent.change(passwordInput, { target: { value: 'test-surname' } });
    expect(passwordInput.value).toBe('test-surname');
  });

  it('should call callback after submit', () => {
    const signupButton = getByTestId('signup-button');

    fireEvent.click(signupButton);
    expect(handleChangePageMock).toHaveBeenCalled();
  });

  it('should call callback after clicking on the link', () => {
    const link = getByTestId('link');

    fireEvent.click(link);
    expect(handleChangePageMock).toHaveBeenCalled();
  });
});
