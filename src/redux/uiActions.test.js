import { isReady } from './uiActions';

test('isReady when not authenticated returns false', () => {
  const state = {
    auth: {
      authenticated: false,
    },
  };

  expect(isReady(state)).toEqual(false);
});

describe('isReady when authenticated', () => {
  const state = {
    auth: {
      authenticated: true,
    },
    device: {},
  };

  test('device is empty object returns false', () => {
    expect(isReady(state)).toBeFalsy();
  });

  test('device is selected returns true', () => {
    state.device.selected = 'device';

    expect(isReady(state)).toEqual(true);
  });

  describe('device is not selected', () => {
    state.device.selected = undefined;

    test('available is object returns true', () => {
      state.device.available = {};

      expect(isReady(state)).toEqual(true);
    });
  });
});

