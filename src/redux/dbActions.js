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

export const setAlarmName = (key, name) => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${key}/name`)
      .set(name).then(
        () => {},
        err => console.log(err),
      );
  }
);

export const setAlarmEnabled = (key, enabled) => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${key}/alarmEnabled`)
      .set(enabled).then(
        () => {},
        err => console.log(err),
      );
  }
);

export const setAlarmTemperature = (key, temperature) => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${key}/alarmTemperature`)
      .set(temperature).then(
        () => {},
        err => console.log(err),
      );
  }
);

export const addSensor = channel => (
  (dispatch, getState) => {
    const state = getState();
    const sensorConfig = {
      channel,
      name: 'New Sensor',
      alarmEnabled: false,
      alarmTemperature: 140,
    };

    firebase.database().ref(`users/${state.auth.userId}/sensor`)
      .push(sensorConfig).then(
        () => {},
        err => console.log(err),
      );
  }
);

export const removeSensor = key => (
  (dispatch, getState) => {
    const state = getState();
    firebase.database().ref(`users/${state.auth.userId}/sensor/${key}`)
      .set(null).then(
        () => {},
        err => console.log(err),
      );
  }
);
