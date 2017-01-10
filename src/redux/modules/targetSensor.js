import firebase from 'firebase';

const SET_SENSOR_STATE = 'bbqpi/targetSensor/SET_STATE';
// const SET_TARGET_TEMPERATURE = 'bbqpi/targetSensor/SET_TARGET_TEMPERATURE';

const config = {
  apiKey: 'AIzaSyC7ytk2f7G4PezRda903EaPMuTBLJRZjxg',
  authDomain: 'bbqpi-b8026.firebaseapp.com',
  databaseURL: 'https://bbqpi-b8026.firebaseio.com',
};

firebase.initializeApp(config);

const initialState = {
  loaded: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case SET_SENSOR_STATE:
    return Object.assign({}, state, { loaded: true, currentSensorState: action.payload });

  default:
    return state;
  }
}

export const setSensorState = sensorState => ({
  type: SET_SENSOR_STATE,
  payload: sensorState,
});

export const login = () => (
  (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
          result => console.log(result),
          err => console.log(err),
        );
      } else {
        firebase.database().ref(`users/${user.uid}/state`)
          .orderByChild('channel')
          .equalTo(0)
          .limitToLast(1)
          .on('child_added', (snapshot) => {
            dispatch(setSensorState(snapshot.val()));
          });
      }
    });
  });

export const setTargetTemperature = temperature => (
  () => {
    firebase.auth().onAuthStateChanged((user) => {
      firebase.database().ref(`users/${user.uid}/targetTemperature`)
        .set(temperature).then(
          () => {},
          err => console.log(err),
        );
    });
  }
);

