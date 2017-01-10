import React from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Fan from '../../components/Fan/Fan';
import { setTargetTemperature } from '../../redux/modules/targetSensor';

const mapStateToProps = (state) => {
  const { currentTemperature, targetTemperature, fan } = state.targetSensor.currentSensorState;

  return {
    title: 'Grill Temperature',
    label: 'Target',
    icon: (<Fan on={fan} />),
    max: 450,
    currentTemperature,
    setTemperature: targetTemperature,
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: (value) => {
    dispatch(setTargetTemperature(value));
  },
});

const TargetSensor = connect(mapStateToProps, mapDispatchToProps)(Sensor);

export default TargetSensor;
