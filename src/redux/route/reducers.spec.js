import routeReducer from './reducers';
import {
  getRouteRequest,
  getRouteSuccess,
  getRouteFailure,
  resetRoute,
} from './actions';

describe('routeReducer', () => {
  it('should return the download state', () => {
    const state = routeReducer(undefined, getRouteRequest());

    expect(state).toEqual({
      isLoading: true,
      coords: null,
      error: null,
    });
  });
  it('should return the success download state', () => {
    const state = routeReducer(undefined, getRouteSuccess([['x', 'y']]));

    expect(state).toEqual({
      isLoading: false,
      coords: [['x', 'y']],
      error: null,
    });
  });

  it('should return the failure download state', () => {
    const state = routeReducer(
      undefined,
      getRouteFailure('test error message'),
    );

    expect(state).toEqual({
      isLoading: false,
      coords: null,
      error: 'test error message',
    });
  });

  it('should return the default state', () => {
    const state = routeReducer(undefined, resetRoute());

    expect(state).toEqual({
      isLoading: false,
      coords: null,
      error: null,
    });
  });
});
