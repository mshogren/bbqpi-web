import reducer, { toggleDeviceDialog, toggleSensorDialog } from './ui';

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({
    isDeviceDialogOpen: false,
    isSensorDialogOpen: false,
  });
});

[true, false].forEach((sensorDialogState) => {
  test('reducer toggles the device dialog state to true', () => {
    expect(
      reducer(
        {
          isDeviceDialogOpen: false,
          isSensorDialogOpen: sensorDialogState,
        },
        toggleDeviceDialog()
      )
    ).toEqual({
      isDeviceDialogOpen: true,
      isSensorDialogOpen: sensorDialogState,
    });
  });
});

[true, false].forEach((sensorDialogState) => {
  test('reducer toggles the device dialog state to false', () => {
    expect(
      reducer(
        {
          isDeviceDialogOpen: true,
          isSensorDialogOpen: sensorDialogState,
        },
        toggleDeviceDialog()
      )
    ).toEqual({
      isDeviceDialogOpen: false,
      isSensorDialogOpen: sensorDialogState,
    });
  });
});

[true, false].forEach((deviceDialogState) => {
  test('reducer toggles the sensor dialog state to true', () => {
    expect(
      reducer(
        {
          isDeviceDialogOpen: deviceDialogState,
          isSensorDialogOpen: false,
        },
        toggleSensorDialog()
      )
    ).toEqual({
      isDeviceDialogOpen: deviceDialogState,
      isSensorDialogOpen: true,
    });
  });
});

[true, false].forEach((deviceDialogState) => {
  test('reducer toggles the sensor dialog state to false', () => {
    expect(
      reducer(
        {
          isDeviceDialogOpen: deviceDialogState,
          isSensorDialogOpen: true,
        },
        toggleSensorDialog()
      )
    ).toEqual({
      isDeviceDialogOpen: deviceDialogState,
      isSensorDialogOpen: false,
    });
  });
});
