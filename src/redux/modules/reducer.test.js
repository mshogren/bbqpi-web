import reducer from './reducer';

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toMatchObject({
    alarmSensors: null,
    auth: {},
    currentSensorState: {},
    device: {},
    ui: {},
  });
});
