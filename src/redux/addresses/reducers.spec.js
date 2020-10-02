import addressesReducer from './reducers';
import {
  getAddressesRequest,
  getAddressesSuccess,
  getAddressesFailure,
} from './actions';

describe('Addresses reducer', () => {
  it('should return the download state', () => {
    const state = addressesReducer(undefined, getAddressesRequest());

    expect(state).toEqual({
      isLoading: true,
      list: [],
      error: null,
    });
  });

  it('should return the success download state', () => {
    const state = addressesReducer(
      undefined,
      getAddressesSuccess(['test place 1', 'test place 2', 'test place 3']),
    );

    expect(state).toEqual({
      isLoading: false,
      list: ['test place 1', 'test place 2', 'test place 3'],
      error: null,
    });
  });

  it('should return the failure download state', () => {
    const state = addressesReducer(
      undefined,
      getAddressesFailure('test error message'),
    );

    expect(state).toEqual({
      isLoading: false,
      list: [],
      error: 'test error message',
    });
  });
});
