import reducer, { initialize, addSensor, updateSensor, removeSensor } from './alarmSensors';

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toBeNull();
});

test('reducer initializes null state to empty object', () => {
  expect(reducer(null, initialize())).toEqual({});
});

test('reducer does not reinitialize state to empty object', () => {
  expect(reducer({
    object1: {},
    object2: {},
  }, initialize())).toEqual({
    object1: {},
    object2: {},
  });
});
