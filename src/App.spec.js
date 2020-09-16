import React from 'react';
import App from 'App';
import { render } from '@testing-library/react';

jest.mock('./components/Map', () => () => <div>Map component</div>);
jest.mock('./components/Profile', () => () => <div>Profile component</div>);
jest.mock('./components/Login', () => () => <div>Login component</div>);
jest.mock('./components/Signup', () => () => <div>Signup component</div>);

describe('App', () => {
  it('render correctly', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Login component');
  });
});
