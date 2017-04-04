import reducer, { initialize, addSensor, updateSensor, removeSensor, listenForChanges } from './alarmSensors';
import { getBaseRef } from '../dbActions';

jest.mock('../dbActions', () => ({
  getBaseRef: jest.fn(),
}));

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toBeNull();
});

test('reducer initializes null state to empty object', () => {
  expect(reducer(null, initialize())).toEqual({});
});

test('reducer does not reinitialize state to empty object', () => {
  expect(reducer({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  }, initialize())).toEqual({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  });
});

test('reducer adds a sensor to a null state', () => {
  expect(reducer(null, addSensor('key', { config: 'config' }))).toEqual({
    key: { config: 'config' },
  });
});

test('reducer adds a sensor to an existing collection', () => {
  expect(reducer({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  }, addSensor('key3', { config: 'config' }))).toEqual({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
    key3: { config: 'config' },
  });
});

test('reducer replaces a sensor in an existing collection', () => {
  expect(reducer({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  }, updateSensor('key1', { config: 'config' }))).toEqual({
    key1: { config: 'config' },
    key2: { config: 'config2' },
  });
});

test('reducer removes a sensor state', () => {
  expect(reducer({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  }, removeSensor('key1'))).toEqual({
    key2: { config: 'config2' },
  });
});

test('reducer removes the last sensor state', () => {
  expect(reducer({
    key1: { config: 'config1' },
  }, removeSensor('key1'))).toEqual({});
});

test('reducer does nothing if key to remove does not exist', () => {
  expect(reducer({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  }, removeSensor('key3'))).toEqual({
    key1: { config: 'config1' },
    key2: { config: 'config2' },
  });
});

describe('listenForChanges', () => {
  const state = {};
  const dispatch = jest.fn();
  const getState = jest.fn(() => state);

  const key = 'key1';
  const val = jest.fn(() => 'sensorConfig');
  const snapshot = { key, val };
  const on = jest.fn();
  const once = jest.fn();
  const orderByChild = jest.fn();
  const child = jest.fn(() => ({ orderByChild }));

  getBaseRef.mockReturnValue({ child });

  test('listenForChanges dispatches initialize action', () => {
    once.mockImplementationOnce((event, callback) => callback());
    orderByChild.mockImplementationOnce(() => ({ once, on }));

    listenForChanges()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'bbqpi/alarmSensors/INITIALIZE',
    });
  });

  test('listenForChanges dispatches addSensor action', () => {
    on.mockImplementationOnce((event, callback) => callback(snapshot));
    orderByChild.mockImplementationOnce(() => ({ once, on }));

    listenForChanges()(dispatch, getState);

    expect(on).toHaveBeenCalledWith('child_added', expect.any(Function));
    expect(val).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'bbqpi/alarmSensors/ADD_SENSOR',
      payload: { key: 'key1', sensorConfig: 'sensorConfig' },
    });
  });

  test('listenForChanges dispatches updateSensor action', () => {
    on.mockImplementationOnce();
    on.mockImplementationOnce((event, callback) => callback(snapshot));
    orderByChild.mockImplementationOnce(() => ({ once, on }));

    listenForChanges()(dispatch, getState);

    expect(on).toHaveBeenCalledWith('child_changed', expect.any(Function));
    expect(val).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'bbqpi/alarmSensors/UPDATE_SENSOR',
      payload: { key: 'key1', sensorConfig: 'sensorConfig' },
    });
  });

  test('listenForChanges dispatches removeSensor action', () => {
    on.mockImplementationOnce();
    on.mockImplementationOnce();
    on.mockImplementationOnce((event, callback) => callback(snapshot));
    orderByChild.mockImplementationOnce(() => ({ once, on }));

    listenForChanges()(dispatch, getState);

    expect(on).toHaveBeenCalledWith('child_removed', expect.any(Function));
    expect(val).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: 'bbqpi/alarmSensors/REMOVE_SENSOR',
      payload: 'key1',
    });
  });

  afterEach(() => {
    expect(getState).toHaveBeenCalled();
    expect(getBaseRef).toHaveBeenCalledWith(state);
    expect(child).toHaveBeenCalledWith('sensor');
    expect(orderByChild).toHaveBeenCalledWith('order');
  });
});
