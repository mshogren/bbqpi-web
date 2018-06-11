import firebase from 'firebase/app';
import 'firebase/database';
import { handleError } from './uiActions';
import { processSubscriptions, getSubscriptionId } from './subscriptionActions';

export const getDeviceRef = (state) =>
  firebase.database().ref(`users/${state.auth.userId}/device`);

export const getBaseRef = (state) =>
  firebase
    .database()
    .ref(`users/${state.auth.userId}/${state.device.selected}`);

export const setTargetTemperature = (temperature) => (dispatch, getState) => {
  const state = getState();
  getBaseRef(state)
    .child('targetTemperature')
    .set(temperature)
    .then(() => {}, handleError);
};

export const setAlarmName = (key, name) => (dispatch, getState) => {
  const state = getState();
  getBaseRef(state)
    .child(`sensor/${key}/name`)
    .set(name)
    .then(() => {}, handleError);
};

export const setAlarmEnabled = (key, enabled) => (dispatch, getState) => {
  const state = getState();
  getBaseRef(state)
    .child(`sensor/${key}/alarmEnabled`)
    .set(enabled)
    .then(() => dispatch(processSubscriptions(enabled)), handleError);
};

export const setAlarmTemperature = (key, temperature) => (
  dispatch,
  getState
) => {
  const state = getState();
  getBaseRef(state)
    .child(`sensor/${key}/alarmTemperature`)
    .set(temperature)
    .then(() => {}, handleError);
};

export const addSensor = (channel) => (dispatch, getState) => {
  const state = getState();
  const sensorConfig = {
    channel,
    name: 'New Sensor',
    alarmEnabled: false,
    alarmTemperature: 140,
    order: 10,
  };

  getBaseRef(state)
    .child('sensor')
    .push(sensorConfig)
    .then(() => {}, handleError);
};

export const removeSensor = (key) => (dispatch, getState) => {
  const state = getState();
  getBaseRef(state)
    .child(`sensor/${key}`)
    .set(null)
    .then(() => {}, handleError);
};

export const addSubscription = (subscription) => (dispatch, getState) => {
  const state = getState();
  getSubscriptionId(subscription).then((subscriptionId) => {
    getBaseRef(state)
      .child(`subscription/${subscriptionId}`)
      .set(subscription)
      .then(() => {}, handleError);
  });
};

export const removeSubscription = (subscription) => (dispatch, getState) => {
  const state = getState();
  getSubscriptionId(subscription).then((subscriptionId) => {
    getBaseRef(state)
      .child(`subscription/${subscriptionId}`)
      .set(null)
      .then(() => {}, handleError);
  });
};

export const reorderSensors = (oldIndex, newIndex) => (dispatch, getState) => {
  const state = getState();
  const keys = Object.keys(state.alarmSensors);

  const updates = {};
  keys.forEach((key, index) => {
    if (oldIndex > newIndex) {
      if (index === oldIndex) {
        updates[`${key}/order`] = newIndex;
      } else if (index < newIndex) {
        updates[`${key}/order`] = index;
      } else if (index < oldIndex) {
        updates[`${key}/order`] = index + 1;
      }
    } else if (newIndex > oldIndex) {
      if (index === oldIndex) {
        updates[`${key}/order`] = newIndex;
      } else if (index > newIndex) {
        updates[`${key}/order`] = index;
      } else if (index > oldIndex) {
        updates[`${key}/order`] = index - 1;
      }
    }
  });

  getBaseRef(state)
    .child('sensor')
    .update(updates)
    .then(() => {}, handleError);
};
