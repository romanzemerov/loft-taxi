import { getIsLoading, getRoute } from 'redux/route/selectors';

describe('Route selectors', () => {
  const TEST_STATE = { route: { isLoading: true, coords: null, error: null } };

  it('should return loading state ', () => {
    expect(getIsLoading(TEST_STATE)).toBe(true);
  });

  it('should return addresses list ', () => {
    const TEST_STATE = {
      route: {
        isLoading: false,
        coords: [
          ['x', 'y'],
          ['x', 'y'],
          ['x', 'y'],
        ],
        error: null,
      },
    };

    expect(getRoute(TEST_STATE)).toEqual([
      ['x', 'y'],
      ['x', 'y'],
      ['x', 'y'],
    ]);
  });
});
