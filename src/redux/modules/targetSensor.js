import firebase from 'firebase';

const SET_SENSOR_STATE = 'bbqpi/targetSensor/SET_STATE';

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case SET_SENSOR_STATE:
    return {
      ...state,
      loaded: true,
      currentSensorState: action.payload,
    };

  default:
    return state;
  }
}

export const setSensorState = sensorState => ({
  type: SET_SENSOR_STATE,
  payload: sensorState,
});

export const listenForChanges = () => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/state`)
      .orderByChild('channel')
      .equalTo(0)
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

