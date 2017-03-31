import reducer, { toggleDeviceDialog, toggleSensorDialog } from './ui';

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toMatchObject({
    isDeviceDialogOpen: false,
    isSensorDialogOpen: false,
  });
});

[true, false].forEach((sensorDialogState) => {
  test('reducer toggles the device dialog state to true', () => {
    expect(reducer({
      isDeviceDialogOpen: false,
      isSensorDialogOpen: sensorDialogState,
    }, toggleDeviceDialog())).toMatchObject({
      isDeviceDialogOpen: true,
      isSensorDialogOpen: sensorDialogState,
    });
  });
});

[true, false].forEach((sensorDialogState) => {
  test('reducer toggles the device dialog state to false', () => {
    expect(reducer({
      isDeviceDialogOpen: true,
      isSensorDialogOpen: sensorDialogState,
    }, toggleDeviceDialog())).toMatchObject({
      isDeviceDialogOpen: false,
      isSensorDialogOpen: sensorDialogState,
    });
  });
});

[true, false].forEach((deviceDialogState) => {
  test('reducer toggles the sensor dialog state to true', () => {
    expect(reducer({
      isDeviceDialogOpen: deviceDialogState,
      isSensorDialogOpen: false,
    }, toggleSensorDialog())).toMatchObject({
      isDeviceDialogOpen: deviceDialogState,
      isSensorDialogOpen: true,
    });
  });
});

[true, false].forEach((deviceDialogState) => {
  test('reducer toggles the sensor dialog state to false', () => {
    expect(reducer({
      isDeviceDialogOpen: deviceDialogState,
      isSensorDialogOpen: true,
    }, toggleSensorDialog())).toMatchObject({
      isDeviceDialogOpen: deviceDialogState,
      isSensorDialogOpen: false,
    });
  });
});
