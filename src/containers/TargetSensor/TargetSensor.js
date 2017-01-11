import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Fan from '../../components/Fan/Fan';
import { listenForChanges, setTargetTemperature } from '../../redux/modules/targetSensor';

const mapStateToProps = (state) => {
  const { loaded } = state.targetSensor;
  let sensorProps;

  if (loaded) {
    const { currentTemperature, targetTemperature, fan } = state.targetSensor.currentSensorState;
    sensorProps = {
      title: 'Grill Temperature',
      label: 'Target',
      icon: (<Fan on={fan} />),
      max: 450,
      currentTemperature,
      setTemperature: targetTemperature,
    };
  }

  return loaded ? {
    loaded,
    sensorProps,
  } : {
    loaded,
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: (value) => {
    dispatch(setTargetTemperature(value));
  },
  handleComponentEvent: () => {
    dispatch(listenForChanges());
  },
});

class TargetSensorComponent extends Component {
  componentWillMount() {
    const { handleComponentEvent } = this.props;
    handleComponentEvent();
  }

  render() {
    const sensorProps = {
      ...this.props.sensorProps,
      handleChange: this.props.handleChange,
    };

    return this.props.loaded ? (
      <Sensor {...sensorProps} />
    ) : (
      <div />
    );
  }
}

TargetSensorComponent.propTypes = {
  loaded: React.PropTypes.bool,
  sensorProps: React.PropTypes.shape({}),
  handleComponentEvent: React.PropTypes.func,
  handleChange: React.PropTypes.func,
};

const TargetSensor = connect(mapStateToProps, mapDispatchToProps)(TargetSensorComponent);

export default TargetSensor;
