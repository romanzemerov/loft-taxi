import { recordSaga } from 'utils/recordSaga';
import { setCardDataSaga, getCardDataSaga } from './sagas';
import { setCardData, getCardData } from 'utils/api';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
} from './actions';

const postCardActionPayload = {
  cardNumber: '123456789',
  expiryDate: 1767225600,
  cardName: 'testName',
  cvc: 'testSecretCode',
};

const getCardActionPayload = {
  token: 'testToken',
};

jest.mock('../../utils/api', () => ({
  setCardData: jest.fn(),
  getCardData: jest.fn(),
}));

describe('Profile sagas', () => {
  describe('Set card data', () => {
    it('success set card data', async () => {
      setCardData.mockImplementation(() => ({
        data: { success: true },
      }));

      const dispatched = await recordSaga(
        setCardDataSaga,
        postCardRequest(postCardActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(postCardSuccess.type);
      expect(payload).toEqual({
        number: '123456789',
        expireDate: 1767225600,
        name: 'testName',
        secretCode: 'testSecretCode',
      });
    });

    it('failure set card data', async () => {
      setCardData.mockImplementation(() => ({
        data: { success: false, error: 'test error message' },
      }));

      const dispatched = await recordSaga(
        setCardDataSaga,
        postCardRequest(postCardActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;
      expect(type).toBe(postCardFailure.type);
      expect(payload).toBe('test error message');
    });

    it('failure set card data (catch error)', async () => {
      setCardData.mockImplementation(() => {
        throw new Error('test error message');
      });

      const dispatched = await recordSaga(
        setCardDataSaga,
        postCardRequest(postCardActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(postCardFailure.type);
      expect(payload).toBe('test error message');
    });
  });

  describe('Get card data', () => {
    it('success get card data', async () => {
      getCardData.mockImplementation(() => ({
        data: {
          cardNumber: '123456789',
          expiryDate: 1767225600,
          cardName: 'testName',
          cvc: 'testSecretCode',
        },
      }));

      const dispatched = await recordSaga(
        getCardDataSaga,
        getCardRequest(getCardActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(getCardSuccess.type);
      expect(payload).toEqual({
        number: '123456789',
        expireDate: 1767225600,
        name: 'testName',
        secretCode: 'testSecretCode',
      });
    });

    it('failure get card data', async () => {
      getCardData.mockImplementation(() => ({
        data: { error: 'test error message' },
      }));

      const dispatched = await recordSaga(
        getCardDataSaga,
        getCardRequest(getCardActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;
      expect(type).toBe(getCardFailure.type);
      expect(payload).toBe('test error message');
    });

    it('failure get card data (catch error)', async () => {
      getCardData.mockImplementation(() => {
        throw new Error('test error message');
      });

      const dispatched = await recordSaga(
        getCardDataSaga,
        getCardRequest(getCardActionPayload),
      );

      const action = dispatched[0];
      const { type, payload } = action;

      expect(type).toBe(getCardFailure.type);
      expect(payload).toBe('test error message');
    });
  });
});
