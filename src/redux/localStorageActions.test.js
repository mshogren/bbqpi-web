import { loadDeviceKey, saveDeviceKey } from './localStorageActions';

window.localStorage = jest.fn();
window.localStorage.getItem = jest.fn();

test('loadDeviceKey returns the device key from local storage', () => {
  window.localStorage.getItem.mockReturnValueOnce('deviceKey');

  expect(loadDeviceKey()).toEqual('deviceKey');
});

test('loadDeviceKey returns undefined if the device key is null', () => {
  window.localStorage.getItem.mockReturnValueOnce(null);

  expect(loadDeviceKey()).not.toBeDefined();
});

test('loadDeviceKey returns undefined if there is an exception', () => {
  window.localStorage.getItem.mockImplementationOnce(() => {
    throw new Error('error');
  });

  expect(loadDeviceKey()).not.toBeDefined();
});

test('saveDeviceKey writes to local storage if device key is defined', () => {
  const state = {
    device: {
      selected: 'selected',
    },
  };

  window.localStorage.setItem = jest.fn();

  saveDeviceKey(state);

  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'deviceKey',
    'selected'
  );
});

test('saveDeviceKey does nothing if device key is undefined', () => {
  const state = {
    device: {
      selected: undefined,
    },
  };

  window.localStorage.setItem = jest.fn();

  saveDeviceKey(state);

  expect(window.localStorage.setItem).not.toHaveBeenCalled();
});

test('saveDeviceKey ignores exceptions', () => {
  const state = {
    device: {
      selected: 'selected',
    },
  };

  window.localStorage.setItem = jest.fn(() => {
    throw new Error('error');
  });

  saveDeviceKey(state);

  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'deviceKey',
    'selected'
  );
});
