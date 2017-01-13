import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Bell from '../../components/Bell/Bell';
import { listenForSensorChanges, removeSensorState } from '../../redux/modules/currentSensorState';
import { setAlarmEnabled, setAlarmTemperature, removeSensor } from '../../redux/dbActions';

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const { alarmSensors, currentSensorState } = state;
  const { name, alarmEnabled, alarmTemperature } = alarmSensors[sensorId];

  if (currentSensorState[sensorId]) {
    const { currentTemperature } = currentSensorState[sensorId];

    return {
      title: name,
      canClose: true,
      max: 225,
      currentTemperature: -currentTemperature,
      setTemperature: alarmTemperature,
      sliderDisabled: !alarmEnabled,
    };
  }

  return { loading: true };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { sensorId, alarmEnabled } = ownProps;

  return {
    handleComponentMount: (channel) => {
      dispatch(listenForSensorChanges(sensorId, channel));
    },
    handleComponentUnmount: () => {
      dispatch(removeSensorState(sensorId));
    },
    handleClick: () => {
      dispatch(setAlarmEnabled(sensorId, !alarmEnabled));
    },
    handleChange: (value) => {
      dispatch(setAlarmTemperature(sensorId, value));
    },
    handleClose: () => {
      dispatch(removeSensor(sensorId));
    },
  };
};

class AlarmSensorComponent extends Component {
  componentWillMount() {
    const { channel, handleComponentMount } = this.props;
    handleComponentMount(channel);
  }

  componentWillUnmount() {
    const { handleComponentUnmount } = this.props;
    handleComponentUnmount();
  }

  render() {
    const { loading, sliderDisabled, handleClick } = this.props;

    if (loading) {
      return (
        <div />
      );
    }

    const bellProps = {
      on: !sliderDisabled,
      handleClick,
    };

    const bell = (
      <Bell {...bellProps} />
    );

    return (
      <Sensor {...this.props} icon={bell} />
    );
  }
}

AlarmSensorComponent.propTypes = {
  loading: React.PropTypes.bool,
  channel: React.PropTypes.number,
  sliderDisabled: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func,
  handleComponentUnmount: React.PropTypes.func,
  handleClick: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmSensorComponent);
