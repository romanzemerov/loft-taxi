import React from 'react';
import Header from 'components/Header';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { AuthContext } from 'contexts/AuthContext';

describe('Header', () => {
  let renderedContainer;

  beforeEach(() => {
    renderedContainer = (currentPage = 'map') => {
      const handleChangePageMock = jest.fn();

      const authContextValue = {
        isLoggedIn: true,
        login: jest.fn(),
        logout: jest.fn(),
      };

      const container = render(
        <AuthContext.Provider value={authContextValue}>
          <Header
            handleChangePage={handleChangePageMock}
            currentPage={currentPage}
          />
        </AuthContext.Provider>,
      );

      return { container, handleChangePageMock, authContextValue };
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { container } = renderedContainer();
    const { getByTestId } = container;

    expect(getByTestId('map')).toBeInTheDocument();
    expect(getByTestId('profile')).toBeInTheDocument();
    expect(getByTestId('logout')).toBeInTheDocument();
  });

  it('calls logout function and callback after clicking logout button', () => {
    const {
      container,
      handleChangePageMock,
      authContextValue,
    } = renderedContainer();
    const { getByTestId } = container;
    const logoutButton = getByTestId('logout');

    fireEvent.click(logoutButton);
    expect(authContextValue.logout).toHaveBeenCalled();
    expect(handleChangePageMock).toHaveBeenCalled();
  });

  it('calls only callback after clicking rest of buttons', () => {
    const {
      container,
      handleChangePageMock,
      authContextValue,
    } = renderedContainer();
    const { getByTestId } = container;
    const logoutButton = getByTestId('profile');

    fireEvent.click(logoutButton);
    expect(authContextValue.logout).not.toHaveBeenCalled();
    expect(handleChangePageMock).toHaveBeenCalled();
  });
});
