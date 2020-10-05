import React from 'react';
import App from 'components/App/App';
import { cleanup, render } from '@testing-library/react';

jest.mock('./components/Map', () => ({
  MapWithHeader: () => <div>Map component</div>,
}));
jest.mock('./components/Profile', () => ({
  ProfileWithHeader: () => <div>Profile component</div>,
}));
jest.mock('./components/Login', () => () => <div>Login component</div>);
jest.mock('./components/Signup', () => () => <div>Signup component</div>);

describe('App', () => {
  const { location } = window;

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    window.location = location;
  });

  it('renders login #1', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Login component');
  });

  it('renders login #2', () => {
    window.history.replaceState({}, 'Test Title', '/map');

    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Login component');
  });

  it('renders signup', () => {
    window.history.replaceState({}, 'Test Title', '/signup');

    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Signup component');
  });
});
