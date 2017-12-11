import { getBaseRef } from '../dbActions';

const SET_SENSOR_STATE = 'bbqpi/currentSensorState/SET_SENSOR_STATE';
const REMOVE_SENSOR_STATE = 'bbqpi/currentSensorState/REMOVE_SENSOR_STATE';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SENSOR_STATE: {
      const { key, sensorState } = action.payload;

      return {
        ...state,
        [key]: sensorState,
      };
    }
    case REMOVE_SENSOR_STATE: {
      return Object.keys(state)
        .filter((key) => key !== action.payload)
        .reduce(
          (result, current) => ({
            ...result,
            [current]: state[current],
          }),
          {}
        );
    }
    default:
      return state;
  }
}

export const setSensorState = (key, sensorState) => ({
  type: SET_SENSOR_STATE,
  payload: { key, sensorState },
});

export const removeSensorState = (key) => ({
  type: REMOVE_SENSOR_STATE,
  payload: key,
});

export const listenForSensorChanges = (key, channel) => (
  dispatch,
  getState
) => {
  const state = getState();
  getBaseRef(state)
    .child('state')
    .orderByChild('channel')
    .equalTo(channel)
    .limitToLast(1)
    .on('child_added', (snapshot) => {
      dispatch(setSensorState(key, snapshot.val()));
    });
};
