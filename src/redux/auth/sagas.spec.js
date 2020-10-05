import { recordSaga } from 'utils/recordSaga';
import { loginSaga, registerSaga } from './sagas';
import { executeAuthorization, register } from 'utils/api';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from './actions';

const loginActionPayload = {
  email: 'testEmail@test.com',
  password: 'testPassword',
};

const registerActionPayload = {
  email: 'testEmail@test.com',
  password: 'testPassword',
  name: 'testName',
  surname: 'testSurname',
};

jest.mock('../../utils/api', () => ({
  executeAuthorization: jest.fn(),
  register: jest.fn(),
}));

describe('Auth sagas', () => {
  describe('Login', () => {
    it('success login through api', async () => {
      executeAuthorization.mockImplementation(() => ({
        data: { success: true, token: 'testToken' },
      }));

      const dispatched = await recordSaga(
        loginSaga,
        loginRequest(loginActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(loginSuccess.type);
      expect(payload).toEqual({
        user: {
          email: 'testEmail@test.com',
          token: 'testToken',
        },
      });
    });

    it('failure login through api', async () => {
      executeAuthorization.mockImplementation(() => ({
        data: { success: false, error: 'test error message' },
      }));

      const dispatched = await recordSaga(
        loginSaga,
        loginRequest(loginActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(loginFailure.type);
      expect(payload).toBe('test error message');
    });

    it('failure login through api (catch error)', async () => {
      executeAuthorization.mockImplementation(() => {
        throw new Error('test error message');
      });

      const dispatched = await recordSaga(
        loginSaga,
        loginRequest(loginActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(loginFailure.type);
      expect(payload).toBe('test error message');
    });
  });

  describe('Register', () => {
    it('success register through api', async () => {
      register.mockImplementation(() => ({
        data: { success: true, token: 'testToken' },
      }));

      const dispatched = await recordSaga(
        registerSaga,
        registerRequest(registerActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(registerSuccess.type);
      expect(payload).toEqual({
        user: {
          email: 'testEmail@test.com',
          token: 'testToken',
        },
      });
    });

    it('failure login through api', async () => {
      register.mockImplementation(() => ({
        data: { success: false, error: 'test error message' },
      }));

      const dispatched = await recordSaga(
        registerSaga,
        registerRequest(registerActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(registerFailure.type);
      expect(payload).toBe('test error message');
    });

    it('failure login through api (catch error)', async () => {
      register.mockImplementation(() => {
        throw new Error('test error message');
      });

      const dispatched = await recordSaga(
        registerSaga,
        registerRequest(registerActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(registerFailure.type);
      expect(payload).toBe('test error message');
    });
  });
});
