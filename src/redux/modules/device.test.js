import reducer, {
  setSelectedDevice,
  setAvailableDevices,
  getAvailableDevices,
} from './device';
import { loadDeviceKey } from '../localStorageActions';
import { getDeviceRef } from '../dbActions';

jest.mock('../localStorageActions', () => ({
  loadDeviceKey: jest.fn(() => 'deviceKey'),
}));

jest.mock('../dbActions', () => ({
  getDeviceRef: jest.fn(),
}));

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({
    selected: 'deviceKey',
  });

  expect(loadDeviceKey).toHaveBeenCalled();
});

test('reducer sets the selected device', () => {
  expect(
    reducer(
      {
        selected: 'deviceKey',
        available: ['deviceKey1', 'deviceKey2'],
      },
      setSelectedDevice('newDeviceKey')
    )
  ).toEqual({
    selected: 'newDeviceKey',
    available: ['deviceKey1', 'deviceKey2'],
  });
});

test('reducer sets the available devices', () => {
  expect(
    reducer(
      {
        selected: 'deviceKey',
        available: ['deviceKey1', 'deviceKey2'],
      },
      setAvailableDevices(['deviceKey3', 'deviceKey4'])
    )
  ).toEqual({
    selected: 'deviceKey',
    available: ['deviceKey3', 'deviceKey4'],
  });
});

test('reducer sets the available devices to empty object', () => {
  expect(
    reducer(
      {
        selected: 'deviceKey',
        available: ['deviceKey1', 'deviceKey2'],
      },
      setAvailableDevices()
    )
  ).toEqual({
    selected: 'deviceKey',
    available: {},
  });
});

test('getAvailableDevices dispatches setAvailableDevices action', () => {
  const state = {};
  const dispatch = jest.fn();
  const getState = jest.fn(() => state);

  const val = jest.fn(() => 'payload');
  const snapshot = { val };
  const once = jest.fn((event, callback) => callback(snapshot));

  getDeviceRef.mockReturnValue({ once });

  getAvailableDevices()(dispatch, getState);

  expect(getState).toHaveBeenCalled();
  expect(getDeviceRef).toHaveBeenCalledWith(state);
  expect(once).toHaveBeenCalledWith('value', expect.any(Function));
  expect(val).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'bbqpi/device/SET_AVAILABLE_DEVICES',
    payload: 'payload',
  });
});
