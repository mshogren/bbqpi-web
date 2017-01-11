import { combineReducers } from 'redux';
import auth from './auth';
import targetSensor from './targetSensor';
import alarmSensors from './alarmSensors';

export default combineReducers({
  auth,
  targetSensor,
  alarmSensors,
});
