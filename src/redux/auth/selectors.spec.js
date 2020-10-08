import {
  getIsLoggedIn,
  getIsLoading,
  getUserToken,
} from 'redux/auth/selectors';

describe('Auth selectors', () => {
  const TEST_STATE = {
    auth: { isLoading: false, isLoggedIn: false, user: null, error: null },
  };

  it('should return loading state ', () => {
    expect(getIsLoading(TEST_STATE)).toBe(false);
  });

  it('should return login state ', () => {
    const TEST_STATE = {
      auth: { isLoading: false, isLoggedIn: false, user: null, error: null },
    };

    expect(getIsLoggedIn(TEST_STATE)).toBe(false);
  });

  it('should return token ', () => {
    const TEST_STATE = {
      auth: {
        isLoading: false,
        isLoggedIn: false,
        user: { token: 'testToken', email: 'testEmail' },
        error: null,
      },
    };

    expect(getUserToken(TEST_STATE)).toBe('testToken');
  });
});
