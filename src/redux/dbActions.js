import firebase from 'firebase';

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

export const setAlarm = enabled => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/alarmSensor`)
      .set(enabled).then(
        () => {},
        err => console.log(err),
      );
  }
);
