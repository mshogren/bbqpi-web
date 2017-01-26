import firebase from 'firebase';

export const getBaseRef = state => (
  firebase.database().ref(`users/${state.auth.userId}/${state.ui.deviceKey}`)
);

const applicationServerPublicKey = 'BLgG-bRbqqabC0bqhxs-yIz31NkPgPjh1e5w3YE4Y9Tez6q7z4Ndq6SthLnmXkoJWkUFCAQCYm7U60qgZkmcAb4';

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const subscribeAlarms = () => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  navigator.serviceWorker.ready.then((swReg) => {
    swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    }).then((subscription) => {
      console.log(JSON.stringify(subscription));
    }).catch(console.log);
  });
};

const unsubscribeAlarms = () => {
};

export const setTargetTemperature = temperature => (
  (dispatch, getState) => {
    const state = getState();
    getBaseRef(state).child('targetTemperature')
      .set(temperature).then(() => {}, console.log);
  }
);

export const setAlarmName = (key, name) => (
  (dispatch, getState) => {
    const state = getState();
    getBaseRef(state).child(`sensor/${key}/name`)
      .set(name).then(() => {}, console.log);
  }
);

export const setAlarmEnabled = (key, enabled) => (
  (dispatch, getState) => {
    if (enabled) {
      subscribeAlarms();
    } else {
      unsubscribeAlarms();
    }

    const state = getState();
    getBaseRef(state).child(`sensor/${key}/alarmEnabled`)
      .set(enabled).then(() => {}, console.log);
  }
);

export const setAlarmTemperature = (key, temperature) => (
  (dispatch, getState) => {
    const state = getState();
    getBaseRef(state).child(`sensor/${key}/alarmTemperature`)
      .set(temperature).then(() => {}, console.log);
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
      order: 10,
    };

    getBaseRef(state).child('sensor')
      .push(sensorConfig).then(() => {}, console.log);
  }
);

export const removeSensor = key => (
  (dispatch, getState) => {
    const state = getState();
    getBaseRef(state).child(`sensor/${key}`)
      .set(null).then(() => {}, console.log);
  }
);

export const reorderSensors = (oldIndex, newIndex) => (
  (dispatch, getState) => {
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

    getBaseRef(state).child('sensor')
      .update(updates).then(() => {}, console.log);
  }
 );
