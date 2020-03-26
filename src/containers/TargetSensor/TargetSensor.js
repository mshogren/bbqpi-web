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
      fanLevel,
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
  componentDidMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  componentWillUnmount() {
    const { handleComponentUnmount } = this.props;
    handleComponentUnmount();
  }

  render() {
    const {
      loading,
      fanLevel,
      currentTemperature,
      setTemperature,
      handleToggle,
      handleChange,
    } = this.props;

    const icon = <Fan level={fanLevel} />;
    const gear = <Gear handleClick={handleToggle} />;

    return loading ? (
      <div />
    ) : (
      <Sensor
        title="Grill Temperature"
        icon={icon}
        cornerIcon={gear}
        channel={0}
        max={450}
        currentTemperature={currentTemperature}
        setTemperature={setTemperature}
        handleChange={handleChange}
      />
    );
  }
}

TargetSensorComponent.propTypes = {
  loading: PropTypes.bool,
  fanLevel: PropTypes.number,
  currentTemperature: PropTypes.number,
  setTemperature: PropTypes.number,
  handleComponentMount: PropTypes.func.isRequired,
  handleComponentUnmount: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

TargetSensorComponent.defaultProps = {
  loading: false,
  fanLevel: undefined,
  currentTemperature: undefined,
  setTemperature: undefined,
};

const TargetSensor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TargetSensorComponent);

export default TargetSensor;
