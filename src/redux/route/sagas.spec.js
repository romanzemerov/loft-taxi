import { recordSaga } from 'utils/recordSaga';
import { getRouteSaga } from './sagas';
import { getRouteData } from 'utils/api';
import { getRouteRequest, getRouteSuccess, getRouteFailure } from './actions';

const getRouteActionPayload = {
  address1: 'testAddress1',
  address2: 'testAddress2',
};

jest.mock('../../utils/api', () => ({
  getRouteData: jest.fn(),
}));

describe('Route sagas', () => {
  it('success get route data', async () => {
    getRouteData.mockImplementation(() => ({
      data: [
        ['x', 'y'],
        ['x', 'y'],
      ],
    }));

    const dispatched = await recordSaga(
      getRouteSaga,
      getRouteRequest(getRouteActionPayload),
    );

    const action = dispatched[0];
    const { type, payload } = action;

    expect(type).toBe(getRouteSuccess.type);
    expect(payload).toEqual([
      ['x', 'y'],
      ['x', 'y'],
    ]);
  });

  it('failure get route data', async () => {
    getRouteData.mockImplementation(() => {
      throw new Error('test error message');
    });

    const dispatched = await recordSaga(
      getRouteSaga,
      getRouteRequest(getRouteActionPayload),
    );

    const action = dispatched[0];
    const { type, payload } = action;

    expect(type).toBe(getRouteFailure.type);
    expect(payload).toEqual('test error message');
  });
});
