import reducer, { setSelectedDevice, setAvailableDevices } from './device';
import { loadDeviceKey } from '../localStorageActions';

jest.mock('../localStorageActions', () => ({
  loadDeviceKey: jest.fn(() => 'deviceKey'),
}));

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({
    selected: 'deviceKey',
  });

  expect(loadDeviceKey).toHaveBeenCalled();
});

test('reducer sets the selected device', () => {
  expect(reducer({
    selected: 'deviceKey',
    available: [
      'deviceKey1',
      'deviceKey2',
    ],
  }, setSelectedDevice('newDeviceKey'))).toEqual({
    selected: 'newDeviceKey',
    available: [
      'deviceKey1',
      'deviceKey2',
    ],
  });
});

test('reducer sets the available devices', () => {
  expect(reducer({
    selected: 'deviceKey',
    available: [
      'deviceKey1',
      'deviceKey2',
    ],
  }, setAvailableDevices(['deviceKey3', 'deviceKey4']))).toEqual({
    selected: 'deviceKey',
    available: [
      'deviceKey3',
      'deviceKey4',
    ],
  });
});

test('reducer sets the available devices to empty object', () => {
  expect(reducer({
    selected: 'deviceKey',
    available: [
      'deviceKey1',
      'deviceKey2',
    ],
  }, setAvailableDevices())).toEqual({
    selected: 'deviceKey',
    available: {},
  });
});
