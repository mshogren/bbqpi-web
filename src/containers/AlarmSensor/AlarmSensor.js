import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Bell from '../../components/Bell/Bell';
import InlineEditor from '../../components/InlineEditor/InlineEditor';
import Close from '../../components/Close/Close';
import {
  listenForSensorChanges,
  removeSensorState,
} from '../../redux/modules/currentSensorState';
import {
  setAlarmName,
  setAlarmEnabled,
  setAlarmTemperature,
  removeSensor,
} from '../../redux/dbActions';

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const { alarmSensors, currentSensorState } = state;
  const { alarmEnabled, alarmTemperature } = alarmSensors[sensorId];

  if (currentSensorState[sensorId]) {
    const { currentTemperature } = currentSensorState[sensorId];

    return {
      currentTemperature,
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
    handleClick: () => {
      dispatch(setAlarmEnabled(sensorId, !alarmEnabled));
    },
    handleChange: (value) => {
      dispatch(setAlarmTemperature(sensorId, value));
    },
    handleEdit: (object) => {
      dispatch(setAlarmName(sensorId, object.name));
    },
    handleClose: () => {
      dispatch(removeSensor(sensorId));
      dispatch(removeSensorState(sensorId));
    },
  };
};

class AlarmSensorComponent extends Component {
  componentDidMount() {
    const { channel, handleComponentMount } = this.props;
    handleComponentMount(channel);
  }

  render() {
    const {
      loading,
      name,
      channel,
      currentTemperature,
      setTemperature,
      sliderDisabled,
      handleClick,
      handleEdit,
      handleChange,
      handleClose,
    } = this.props;

    if (loading) {
      return <div />;
    }

    const label = String.fromCharCode(9311 + channel);

    const inlineEditor = (
      <span>
        <span style={{ color: '#ccc' }}>
          {label}
          &nbsp;
        </span>
        <InlineEditor propName="name" value={name} change={handleEdit} />
      </span>
    );

    const bell = <Bell on={!sliderDisabled} handleClick={handleClick} />;

    const close = <Close handleClick={handleClose} />;

    return (
      <Sensor
        title={inlineEditor}
        icon={bell}
        cornerIcon={close}
        channel={channel}
        max={225}
        currentTemperature={currentTemperature}
        setTemperature={setTemperature}
        handleChange={handleChange}
      />
    );
  }
}

AlarmSensorComponent.propTypes = {
  loading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  channel: PropTypes.number.isRequired,
  currentTemperature: PropTypes.number,
  setTemperature: PropTypes.number,
  sliderDisabled: PropTypes.bool,
  handleComponentMount: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

AlarmSensorComponent.defaultProps = {
  loading: false,
  sliderDisabled: false,
  currentTemperature: undefined,
  setTemperature: undefined,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmSensorComponent);
