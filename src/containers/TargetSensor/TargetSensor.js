import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Fan from '../../components/Fan/Fan';
import Gear from '../../components/Gear/Gear';
import {
  listenForSensorChanges,
  removeSensorState,
} from '../../redux/modules/currentSensorState';
import { setTargetTemperature } from '../../redux/dbActions';
import { toggleDeviceDialog } from '../../redux/modules/ui';

const mapStateToProps = (state) => {
  if (state.currentSensorState.grillSensor) {
    const {
      currentTemperature,
      targetTemperature,
      fanLevel,
    } = state.currentSensorState.grillSensor;

    return {
      title: 'Grill Temperature',
      icon: <Fan level={fanLevel} />,
      channel: 0,
      max: 450,
      currentTemperature,
      setTemperature: targetTemperature,
    };
  }

  return { loading: true };
};

const mapDispatchToProps = (dispatch) => ({
  handleComponentMount: () => {
    dispatch(listenForSensorChanges('grillSensor', 0));
  },
  handleComponentUnmount: () => {
    dispatch(removeSensorState('grillSensor'));
  },
  handleChange: (value) => {
    dispatch(setTargetTemperature(value));
  },
  handleToggle: () => {
    dispatch(toggleDeviceDialog());
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
    const { loading, handleToggle } = this.props;

    const gear = <Gear handleClick={handleToggle} />;

    return loading ? <div /> : <Sensor {...this.props} cornerIcon={gear} />;
  }
}

TargetSensorComponent.propTypes = {
  loading: PropTypes.bool,
  handleComponentMount: PropTypes.func.isRequired,
  handleComponentUnmount: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

TargetSensorComponent.defaultProps = {
  loading: false,
};

const TargetSensor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TargetSensorComponent);

export default TargetSensor;
