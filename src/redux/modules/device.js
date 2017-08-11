import { loadDeviceKey } from '../localStorageActions';
import { getDeviceRef } from '../dbActions';

const SET_SELECTED_DEVICE = 'bbqpi/device/SET_SELECTED_DEVICE';
const SET_AVAILABLE_DEVICES = 'bbqpi/device/SET_AVAILABLE_DEVICES';

const initialState = {
  selected: loadDeviceKey(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SET_SELECTED_DEVICE:
    return {
      ...state,
      selected: action.payload,
    };

  case SET_AVAILABLE_DEVICES:
    return {
      ...state,
      available: action.payload || {},
    };

  default:
    return state;
  }
}

export const setSelectedDevice = deviceKey => ({
  type: SET_SELECTED_DEVICE,
  payload: deviceKey,
});

export const setAvailableDevices = deviceKeys => ({
  type: SET_AVAILABLE_DEVICES,
  payload: deviceKeys,
});

export const getAvailableDevices = () => (
  (dispatch, getState) => {
    const state = getState();
    getDeviceRef(state).once('value', (snapshot) => {
      dispatch(setAvailableDevices(snapshot.val()));
    });
  }
);
