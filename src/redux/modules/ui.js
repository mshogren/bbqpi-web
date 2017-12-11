const TOGGLE_SENSOR_DIALOG = 'bbqpi/ui/TOGGLE_SENSOR_DIALOG';
const TOGGLE_DEVICE_DIALOG = 'bbqpi/ui/TOGGLE_DEVICE_DIALOG';

const initialState = {
  isSensorDialogOpen: false,
  isDeviceDialogOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DEVICE_DIALOG:
      return {
        ...state,
        isDeviceDialogOpen: !state.isDeviceDialogOpen,
      };

    case TOGGLE_SENSOR_DIALOG:
      return {
        ...state,
        isSensorDialogOpen: !state.isSensorDialogOpen,
      };

    default:
      return state;
  }
}

export const toggleDeviceDialog = () => ({
  type: TOGGLE_DEVICE_DIALOG,
});

export const toggleSensorDialog = () => ({
  type: TOGGLE_SENSOR_DIALOG,
});
