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

export const setAlarmEnabled = (channel, enabled) => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${channel}/alarmEnabled`)
      .set(enabled).then(
        () => {},
        err => console.log(err),
      );
  }
);

export const setAlarmTemperature = (channel, temperature) => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${channel}/alarmTemperature`)
      .set(temperature).then(
        () => {},
        err => console.log(err),
      );
  }
);

export const removeSensor = channel => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${channel}`)
      .set(null).then(
        () => {},
        err => console.log(err),
      );
  }
);
