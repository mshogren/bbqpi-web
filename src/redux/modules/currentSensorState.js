import firebase from 'firebase';

const SET_SENSOR_STATE = 'bbqpi/currentSensorState/SET_SENSOR_STATE';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case SET_SENSOR_STATE: {
    const newState = [...state];
    newState[action.payload.channel] = action.payload;

    return newState;
  }
  default:
    return state;
  }
}

export const setSensorState = sensorState => ({
  type: SET_SENSOR_STATE,
  payload: sensorState,
});

export const listenForSensorChanges = channel => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/state`)
      .orderByChild('channel')
      .equalTo(channel)
      .limitToLast(1)
      .on('child_added', (snapshot) => {
        dispatch(setSensorState(snapshot.val()));
      });
  });

export const setTargetTemperature = temperature => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/targetTemperature`)
      .set(temperature).then(
        () => {},
        err => console.log(err),
      );
  }
);

