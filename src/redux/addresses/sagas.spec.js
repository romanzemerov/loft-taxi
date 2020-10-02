import { recordSaga } from 'utils/recordSaga';
import { getAddressesSaga } from './sagas';
import { getAddressesData } from 'utils/api';
import {
  getAddressesRequest,
  getAddressesSuccess,
  getAddressesFailure,
} from './actions';

jest.mock('../../utils/api', () => ({
  getAddressesData: jest.fn(),
}));

describe('Addresses sagas', () => {
  it('success get addresses data', async () => {
    getAddressesData.mockImplementation(() => ({
      data: { addresses: ['test place 1', 'test place 2', 'test place 3'] },
    }));

    const dispatched = await recordSaga(getAddressesSaga, getAddressesRequest);

    const action = dispatched[0];
    const { type, payload } = action;

    expect(type).toBe(getAddressesSuccess.type);
    expect(payload).toEqual(['test place 1', 'test place 2', 'test place 3']);
  });

  it('failure get addresses data', async () => {
    getAddressesData.mockImplementation(() => {
      throw new Error('test error message');
    });

    const dispatched = await recordSaga(getAddressesSaga, getAddressesRequest);

    const action = dispatched[0];
    const { type, payload } = action;

    expect(type).toBe(getAddressesFailure.type);
    expect(payload).toEqual('test error message');
  });
});
