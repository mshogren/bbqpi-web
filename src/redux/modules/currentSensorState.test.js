import reducer, {
  setSensorState,
  removeSensorState,
  listenForSensorChanges,
} from './currentSensorState';
import { getBaseRef } from '../dbActions';

jest.mock('../dbActions', () => ({
  getBaseRef: jest.fn(),
}));

test('reducer returns initial state', () => {
  expect(reducer(undefined, { type: null })).toEqual({});
});

test('reducer adds a sensor state', () => {
  expect(
    reducer(
      {
        key1: { state: 'state1' },
        key2: { state: 'state2' },
      },
      setSensorState('key3', { state: 'state' })
    )
  ).toEqual({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
    key3: { state: 'state' },
  });
});

test('reducer replaces a sensor state', () => {
  expect(
    reducer(
      {
        key1: { state: 'state1' },
        key2: { state: 'state2' },
      },
      setSensorState('key2', { state: 'state' })
    )
  ).toEqual({
    key1: { state: 'state1' },
    key2: { state: 'state' },
  });
});

test('reducer removes a sensor state', () => {
  expect(
    reducer(
      {
        key1: { state: 'state1' },
        key2: { state: 'state2' },
      },
      removeSensorState('key1')
    )
  ).toEqual({
    key2: { state: 'state2' },
  });
});

test('reducer removes the last sensor state', () => {
  expect(
    reducer(
      {
        key1: { state: 'state1' },
      },
      removeSensorState('key1')
    )
  ).toEqual({});
});

test('reducer does nothing if key to remove does not exist', () => {
  expect(
    reducer(
      {
        key1: { state: 'state1' },
        key2: { state: 'state2' },
      },
      removeSensorState('key3')
    )
  ).toEqual({
    key1: { state: 'state1' },
    key2: { state: 'state2' },
  });
});

test('listenForSensorChanges dispatches setSensorState action', () => {
  const state = {};
  const dispatch = jest.fn();
  const getState = jest.fn(() => state);

  const val = jest.fn(() => 'sensorState');
  const snapshot = { val };
  const on = jest.fn((event, callback) => callback(snapshot));
  const limitToLast = jest.fn(() => ({ on }));
  const equalTo = jest.fn(() => ({ limitToLast }));
  const orderByChild = jest.fn(() => ({ equalTo }));
  const child = jest.fn(() => ({ orderByChild }));

  getBaseRef.mockReturnValue({ child });

  listenForSensorChanges('key1', 0)(dispatch, getState);

  expect(getState).toHaveBeenCalled();
  expect(getBaseRef).toHaveBeenCalledWith(state);
  expect(child).toHaveBeenCalledWith('state');
  expect(orderByChild).toHaveBeenCalledWith('channel');
  expect(equalTo).toHaveBeenCalledWith(0);
  expect(limitToLast).toHaveBeenCalledWith(1);
  expect(on).toHaveBeenCalledWith('child_added', expect.any(Function));
  expect(val).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'bbqpi/currentSensorState/SET_SENSOR_STATE',
    payload: { key: 'key1', sensorState: 'sensorState' },
  });
});
