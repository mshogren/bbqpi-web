import reducer, { setSensorState, removeSensorState } from './currentSensorState';

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({});
});

test('reducer adds a sensor state', () => {
  expect(reducer({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
  }, setSensorState('key3', { state: 'state' }))).toEqual({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
    key3: { state: 'state' },
  });
});

test('reducer replaces a sensor state', () => {
  expect(reducer({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
  }, setSensorState('key2', { state: 'state' }))).toEqual({
    key1: { state: 'state1' },
    key2: { state: 'state' },
  });
});

test('reducer removes a sensor state', () => {
  expect(reducer({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
  }, removeSensorState('key1'))).toEqual({
    key2: { state: 'state2' },
  });
});

test('reducer removes the last sensor state', () => {
  expect(reducer({
    key1: { state: 'state1' },
  }, removeSensorState('key1'))).toEqual({});
});

test('reducer does nothing if key to remove does not exist', () => {
  expect(reducer({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
  }, setSensorState('key3'))).toEqual({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
  });
});
