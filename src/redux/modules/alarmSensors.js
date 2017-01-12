import firebase from 'firebase';

const INITIALIZE = 'bbqpi/alarmSensors/INITIALIZE';
const ADD_SENSOR = 'bbqpi/alarmSensors/ADD_SENSOR';
const REMOVE_SENSOR = 'bbqpi/alarmSensors/REMOVE_SENSOR';

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case INITIALIZE:
    return state || [];

  case ADD_SENSOR: {
    const newState = state ? [...state] : [];
    newState[action.payload.channel] = action.payload;

    return newState;
  }
  default:
    return state;
  }
}

export const initialize = () => ({
  type: INITIALIZE,
});

export const addSensor = sensorConfig => ({
  type: ADD_SENSOR,
  payload: sensorConfig,
});

export const removeSensor = sensorConfig => ({
  type: REMOVE_SENSOR,
  payload: sensorConfig,
});

export const listenForChanges = () => (
  (dispatch, getState) => {
    const state = getState();
    const ref = firebase.database().ref(`users/${state.auth.userId}/sensor`);

    ref.on('child_added', (snapshot) => {
      dispatch(addSensor(snapshot.val()));
    });

    ref.on('child_removed', (snapshot) => {
      dispatch(removeSensor(snapshot.val()));
    });

    ref.once('value', () => {
      dispatch(initialize());
    });
  });

