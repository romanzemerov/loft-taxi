import {
  getIsCardLoading,
  getIsCardLoaded,
  getCard,
  getIsCardExist,
  getCardLoadingError,
  getIsCardUpdate,
} from 'redux/profile/selectors';
import { defaultCardState } from 'redux/profile/reducers';

describe('Profile selectors', () => {
  const TEST_STATE = {
    profile: {
      isLoading: false,
      card: defaultCardState,
      isCardLoaded: false,
      isUpdated: false,
      error: null,
    },
  };

  it('should return loading state ', () => {
    expect(getIsCardLoading(TEST_STATE)).toBe(false);
  });

  it('should return loaded state ', () => {
    const TEST_STATE = {
      profile: {
        isLoading: true,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: null,
      },
    };

    expect(getIsCardLoaded(TEST_STATE)).toBe(false);
  });

  it('should return card data ', () => {
    const TEST_STATE = {
      profile: {
        isLoading: false,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: null,
      },
    };

    expect(getCard(TEST_STATE)).toEqual({
      number: '',
      expireDate: null,
      name: '',
      secretCode: '',
    });
  });

  it('should return falsy existing card state ', () => {
    const TEST_STATE = {
      profile: {
        isLoading: false,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: null,
      },
    };

    expect(getIsCardExist(TEST_STATE)).toBe(false);
  });

  it('should return truthy existing card state ', () => {
    const TEST_STATE = {
      profile: {
        isLoading: false,
        card: {
          number: 'testNumber',
          expireDate: 'testExpireDate',
          name: 'testName',
          secretCode: 'testSecretCode',
        },
        isCardLoaded: true,
        isUpdated: false,
        error: null,
      },
    };

    expect(getIsCardExist(TEST_STATE)).toBe(true);
  });

  it('should return falsy existing card state ', () => {
    const TEST_STATE = {
      profile: {
        isLoading: false,
        card: defaultCardState,
        isCardLoaded: false,
        isUpdated: false,
        error: 'testError',
      },
    };

    expect(getCardLoadingError(TEST_STATE)).toBe('testError');
  });

  it('should return truthy updated card state ', () => {
    const TEST_STATE = {
      profile: {
        isLoading: false,
        card: {
          number: 'testNumber',
          expireDate: 'testExpireDate',
          name: 'testName',
          secretCode: 'testSecretCode',
        },
        isCardLoaded: false,
        isUpdated: true,
        error: null,
      },
    };

    expect(getIsCardUpdate(TEST_STATE)).toBe(true);
  });
});
