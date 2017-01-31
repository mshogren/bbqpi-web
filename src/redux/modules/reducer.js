import { combineReducers } from 'redux';
import auth from './auth';
import device from './device';
import currentSensorState from './currentSensorState';
import alarmSensors from './alarmSensors';
import ui from './ui';

export default combineReducers({
  auth,
  device,
  currentSensorState,
  alarmSensors,
  ui,
});
