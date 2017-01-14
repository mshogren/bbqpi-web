import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Fan from '../../components/Fan/Fan';
import { listenForSensorChanges, removeSensorState } from '../../redux/modules/currentSensorState';
import { setTargetTemperature } from '../../redux/dbActions';

const mapStateToProps = (state) => {
  if (state.currentSensorState.grillSensor) {
    const { currentTemperature, targetTemperature, fan } = state.currentSensorState.grillSensor;
    return {
      title: 'Grill Temperature',
      icon: (<Fan on={fan} />),
      max: 450,
      currentTemperature,
      setTemperature: targetTemperature,
    };
  }

  return { loading: true };
};

const mapDispatchToProps = dispatch => ({
  handleComponentMount: () => {
    dispatch(listenForSensorChanges('grillSensor', 0));
  },
  handleComponentUnmount: () => {
    dispatch(removeSensorState('grillSensor'));
  },
  handleChange: (value) => {
    dispatch(setTargetTemperature(value));
  },
});

class TargetSensorComponent extends Component {
  componentWillMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  componentWillUnmount() {
    const { handleComponentUnmount } = this.props;
    handleComponentUnmount();
  }

  render() {
    const { loading } = this.props;
    return loading ? (
      <div />
    ) : (
      <Sensor {...this.props} />
    );
  }
}

TargetSensorComponent.propTypes = {
  loading: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func,
  handleComponentUnmount: React.PropTypes.func,
};

const TargetSensor = connect(mapStateToProps, mapDispatchToProps)(TargetSensorComponent);

export default TargetSensor;
