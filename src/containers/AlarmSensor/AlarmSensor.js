import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Bell from '../../components/Bell/Bell';
import InlineEditor from '../../components/InlineEditor/InlineEditor';
import Close from '../../components/Close/Close';
import { listenForSensorChanges, removeSensorState } from '../../redux/modules/currentSensorState';
import { setAlarmName, setAlarmEnabled, setAlarmTemperature, removeSensor } from '../../redux/dbActions';

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const { alarmSensors, currentSensorState } = state;
  const { alarmEnabled, alarmTemperature } = alarmSensors[sensorId];

  if (currentSensorState[sensorId]) {
    const { currentTemperature } = currentSensorState[sensorId];

    return {
      max: 225,
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
    handleComponentUnmount: () => {
      dispatch(removeSensorState(sensorId));
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
    const {
      loading,
      name,
      channel,
      sliderDisabled,
      handleClick,
      handleEdit,
      handleClose,
    } = this.props;

    if (loading) {
      return (
        <div />
      );
    }

    const inlineEditorProps = {
      value: name,
      propName: 'name',
      change: handleEdit,
    };

    const label = String.fromCharCode(9311 + channel);

    const inlineEditor = (
      <span>
        <span style={{ color: '#ccc' }}>{label} </span>
        <InlineEditor {...inlineEditorProps} />
      </span>
    );

    const bellProps = {
      on: !sliderDisabled,
      handleClick,
    };

    const bell = (
      <Bell {...bellProps} />
    );

    const close = (<Close handleClick={handleClose} />);

    const sensorProps = {
      ...this.props,
      title: inlineEditor,
      cornerIcon: close,
      icon: bell,
    };

    return (
      <Sensor {...sensorProps} />
    );
  }
}

AlarmSensorComponent.propTypes = {
  loading: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  channel: React.PropTypes.number.isRequired,
  sliderDisabled: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func.isRequired,
  handleComponentUnmount: React.PropTypes.func.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  handleEdit: React.PropTypes.func.isRequired,
  handleClose: React.PropTypes.func.isRequired,
};

AlarmSensorComponent.defaultProps = {
  loading: false,
  sliderDisabled: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmSensorComponent);
