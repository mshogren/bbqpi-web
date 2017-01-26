import { loadDeviceKey } from '../localStorageActions';

const SET_DEVICE_KEY = 'bbqpi/ui/SET_DEVICE_KEY';
const TOGGLE_DIALOG = 'bbqpi/ui/TOGGLE_DIALOG';

const initialState = {
  isDialogOpen: false,
  deviceKey: loadDeviceKey(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case SET_DEVICE_KEY:
    return {
      ...state,
      deviceKey: action.payload,
    };

  case TOGGLE_DIALOG:
    return {
      ...state,
      isDialogOpen: !state.isDialogOpen,
    };

  default:
    return state;
  }
}

export const setDeviceKey = deviceKey => ({
  type: SET_DEVICE_KEY,
  payload: deviceKey,
});

export const toggleDialog = () => ({
  type: TOGGLE_DIALOG,
});

