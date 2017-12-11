import { handleError } from './uiActions';
import { addSubscription, removeSubscription } from './dbActions';

const convertArrayBufferToHexaDecimal = (buffer) => {
  const dataView = new DataView(buffer);
  let hex = '';
  const len = dataView.byteLength;

  for (let iii = 0; iii < len; iii += 1) {
    let c = dataView.getUint8(iii).toString(16);
    if (c.length < 2) {
      c = `0${c}`;
    }

    hex += c;
  }

  return hex;
};

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const getPushManager = () =>
  navigator.serviceWorker.ready.then(
    (serviceWorkerRegistration) => serviceWorkerRegistration.pushManager
  );

const subscribe = () => (dispatch, getState) => {
  getPushManager().then((pushManager) => {
    const state = getState();
    const applicationServerPublicKey = state.device.selected;
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

    pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      })
      .then((subscription) => {
        const subscriptionData = JSON.parse(JSON.stringify(subscription));
        dispatch(addSubscription(subscriptionData));
      })
      .catch(handleError);
  });
};

const unsubscribe = () => (dispatch) => {
  getPushManager().then((pushManager) => {
    pushManager.getSubscription().then((subscription) => {
      if (subscription !== null) {
        subscription
          .unsubscribe()
          .then(() => dispatch(removeSubscription(subscription)))
          .catch(handleError);
      }
    });
  });
};

const getNumberOfActiveAlarms = (state) => {
  const { alarmSensors } = state;
  return Object.keys(alarmSensors).filter(
    (key) => alarmSensors[key].alarmEnabled
  ).length;
};

export const processSubscriptions = (enabled) => (dispatch, getState) => {
  const state = getState();
  const numberOfAlarms = getNumberOfActiveAlarms(state);
  if (enabled && numberOfAlarms === 1) {
    dispatch(subscribe());
  } else if (numberOfAlarms === 0) {
    dispatch(unsubscribe());
  }
};

export const getSubscriptionId = (subscription) => {
  const buffer = new TextEncoder('utf-8').encode(subscription.endpoint);
  return crypto.subtle
    .digest('SHA-256', buffer)
    .then((hash) => convertArrayBufferToHexaDecimal(hash));
};
