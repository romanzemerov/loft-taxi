import profileReducer from './reducers';
import {
  postCardRequest,
  postCardSuccess,
  postCardFailure,
  getCardRequest,
  getCardSuccess,
  getCardFailure,
  resetUpdateCard,
} from './actions';

const defaultCardState = {
  number: '',
  expireDate: null,
  name: '',
  secretCode: '',
};

describe('Profile reducer', () => {
  describe('Set card', () => {
    it('should return the download state', () => {
      const state = profileReducer(undefined, postCardRequest());

      expect(state).toEqual({
        isLoading: true,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: null,
      });
    });

    it('should return the success download state', () => {
      const state = profileReducer(
        undefined,
        postCardSuccess({
          number: '123',
          expireDate: 1767225600,
          name: 'test name',
          secretCode: 'test secret code',
        }),
      );

      expect(state).toEqual({
        isLoading: false,
        card: {
          number: '123',
          expireDate: 1767225600,
          name: 'test name',
          secretCode: 'test secret code',
        },
        isUpdated: true,
        isCardLoaded: true,
        error: null,
      });
    });

    it('should return the failure download state', () => {
      const state = profileReducer(
        undefined,
        postCardFailure('test error message'),
      );

      expect(state).toEqual({
        isLoading: false,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: 'test error message',
      });
    });
  });
  describe('Get card', () => {
    it('should return the download state', () => {
      const state = profileReducer(undefined, getCardRequest());

      expect(state).toEqual({
        isLoading: true,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: null,
      });
    });

    it('should return the success download state', () => {
      const state = profileReducer(
        undefined,
        getCardSuccess({
          number: '123',
          expireDate: 1767225600,
          name: 'test name',
          secretCode: 'test secret code',
        }),
      );

      expect(state).toEqual({
        isLoading: false,
        card: {
          number: '123',
          expireDate: 1767225600,
          name: 'test name',
          secretCode: 'test secret code',
        },
        isUpdated: false,
        isCardLoaded: true,
        error: null,
      });
    });

    it('should return the failure download state', () => {
      const state = profileReducer(
        undefined,
        getCardFailure('test error message'),
      );

      expect(state).toEqual({
        isLoading: false,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: 'test error message',
      });
    });
  });

  it('should return state with resetting updated field', () => {
    const state = profileReducer(undefined, resetUpdateCard());

    expect(state).toEqual({
      isLoading: false,
      card: defaultCardState,
      isCardLoaded: false,
      isUpdated: false,
      error: null,
    });
  });
});
