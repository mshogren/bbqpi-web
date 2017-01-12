import { combineReducers } from 'redux';
import auth from './auth';
import currentSensorState from './currentSensorState';
import alarmSensors from './alarmSensors';

export default combineReducers({
  auth,
  currentSensorState,
  alarmSensors,
});
