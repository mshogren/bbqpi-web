import { getBaseRef } from '../dbActions';

const INITIALIZE = 'bbqpi/alarmSensors/INITIALIZE';
const ADD_SENSOR = 'bbqpi/alarmSensors/ADD_SENSOR';
const UPDATE_SENSOR = 'bbqpi/alarmSensors/UPDATE_SENSOR';
const REMOVE_SENSOR = 'bbqpi/alarmSensors/REMOVE_SENSOR';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case INITIALIZE:
    return state || {};

  case ADD_SENSOR:
  case UPDATE_SENSOR: {
    const { key, sensorConfig } = action.payload;

    return state ? {
      ...state,
      [key]: sensorConfig,
    } : {
      [key]: sensorConfig,
    };
  }
  case REMOVE_SENSOR: {
    return Object.keys(state)
      .filter(key => key !== action.payload)
      .reduce((result, current) => ({
        ...result,
        [current]: state[current],
      }), {});
  }
  default:
    return state;
  }
}

export const initialize = () => ({
  type: INITIALIZE,
});

export const addSensor = (key, sensorConfig) => ({
  type: ADD_SENSOR,
  payload: { key, sensorConfig },
});

export const updateSensor = (key, sensorConfig) => ({
  type: UPDATE_SENSOR,
  payload: { key, sensorConfig },
});

export const removeSensor = key => ({
  type: REMOVE_SENSOR,
  payload: key,
});

export const listenForChanges = () => (
  (dispatch, getState) => {
    const state = getState();
    const ref = getBaseRef(state).child('sensor').orderByChild('order');

    ref.on('child_added', (snapshot) => {
      dispatch(addSensor(snapshot.key, snapshot.val()));
    });

    ref.on('child_changed', (snapshot) => {
      dispatch(updateSensor(snapshot.key, snapshot.val()));
    });

    ref.on('child_removed', (snapshot) => {
      dispatch(removeSensor(snapshot.key));
    });

    ref.once('value', () => {
      dispatch(initialize());
    });
  });

