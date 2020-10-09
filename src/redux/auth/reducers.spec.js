import authReducer from './reducers';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  clearError,
  logout,
} from './actions';

describe('Auth reducer', () => {
  describe('Login', () => {
    it('should return the download state', () => {
      const state = authReducer(undefined, loginRequest());

      expect(state).toEqual({
        isLoading: true,
        isLoggedIn: false,
        user: null,
        error: null,
      });
    });

    it('should return the success download state', () => {
      const state = authReducer(
        undefined,
        loginSuccess({
          user: {
            email: 'testEmail@test.com',
            token: 'testToken',
          },
        }),
      );

      expect(state).toEqual({
        isLoading: false,
        isLoggedIn: true,
        user: {
          email: 'testEmail@test.com',
          token: 'testToken',
        },
        error: null,
      });
    });

    it('should return the failure download state', () => {
      const state = authReducer(undefined, loginFailure('test error message'));

      expect(state).toEqual({
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: 'test error message',
      });
    });
  });

  describe('Logout', () => {
    it('should return the download state', () => {
      const initialState = {
        isLoading: false,
        isLoggedIn: true,
        user: {
          email: 'testEmail@test.com',
          token: 'testToken',
        },
        error: null,
      };

      const state = authReducer(initialState, logout());

      expect(state).toEqual({
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: null,
      });
    });
  });

  describe('Register', () => {
    it('should return the download state', () => {
      const state = authReducer(undefined, registerRequest());

      expect(state).toEqual({
        isLoading: true,
        isLoggedIn: false,
        user: null,
        error: null,
      });
    });

    it('should return the success download state', () => {
      const state = authReducer(
        undefined,
        registerSuccess({
          user: {
            email: 'testEmail@test.com',
            token: 'testToken',
          },
        }),
      );

      expect(state).toEqual({
        isLoading: false,
        isLoggedIn: true,
        user: {
          email: 'testEmail@test.com',
          token: 'testToken',
        },
        error: null,
      });
    });

    it('should return the failure download state', () => {
      const state = authReducer(
        undefined,
        registerFailure('test error message'),
      );

      expect(state).toEqual({
        isLoading: false,
        isLoggedIn: false,
        user: null,
        error: 'test error message',
      });
    });
  });

  it('should return clear error state', () => {
    const initialState = {
      isLoading: false,
      isLoggedIn: false,
      user: null,
      error: 'testError',
    };

    const state = authReducer(initialState, clearError());

    expect(state).toEqual({
      isLoading: false,
      isLoggedIn: false,
      user: null,
      error: null,
    });
  });
});
