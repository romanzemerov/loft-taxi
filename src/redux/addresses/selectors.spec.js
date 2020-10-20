import {
  getIsLoading,
  getAddresses,
  getIsAddressesLoaded,
} from 'redux/addresses/selectors';

describe('Addresses selectors', () => {
  const TEST_STATE = { addresses: { isLoading: false, list: [], error: null } };

  it('should return loading state ', () => {
    expect(getIsLoading(TEST_STATE)).toBe(false);
  });

  it('should return addresses list ', () => {
    const TEST_STATE = {
      addresses: {
        isLoading: false,
        list: ['test address', 'test address', 'test address'],
        error: null,
      },
    };

    expect(getAddresses(TEST_STATE)).toEqual([
      'test address',
      'test address',
      'test address',
    ]);
  });

  it('should return truthy loading addresses state ', () => {
    const TEST_STATE = {
      addresses: {
        isLoading: false,
        list: ['test address', 'test address', 'test address'],
        error: null,
      },
    };

    expect(getIsAddressesLoaded(TEST_STATE)).toEqual(true);
  });

  it('should return falsy loading addresses state ', () => {
    const TEST_STATE = {
      addresses: { isLoading: false, list: [], error: null },
    };

    expect(getIsAddressesLoaded(TEST_STATE)).toEqual(false);
  });
});
