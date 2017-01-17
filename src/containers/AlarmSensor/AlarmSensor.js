import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Bell from '../../components/Bell/Bell';
import InlineEditor from '../../components/InlineEditor/InlineEditor';
import { listenForSensorChanges, removeSensorState } from '../../redux/modules/currentSensorState';
import { setAlarmName, setAlarmEnabled, setAlarmTemperature, removeSensor } from '../../redux/dbActions';

const mapStateToProps = (state, ownProps) => {
  const { sensorId } = ownProps;
  const { alarmSensors, currentSensorState } = state;
  const { alarmEnabled, alarmTemperature } = alarmSensors[sensorId];

  if (currentSensorState[sensorId]) {
    const { currentTemperature } = currentSensorState[sensorId];

    return {
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
    const { loading, name, sliderDisabled, handleClick, handleEdit } = this.props;

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

    const inlineEditor = (
      <InlineEditor {...inlineEditorProps} />
    );

    const bellProps = {
      on: !sliderDisabled,
      handleClick,
    };

    const bell = (
      <Bell {...bellProps} />
    );

    return (
      <Sensor {...this.props} title={inlineEditor} icon={bell} />
    );
  }
}

AlarmSensorComponent.propTypes = {
  loading: React.PropTypes.bool,
  name: React.PropTypes.string,
  channel: React.PropTypes.number,
  sliderDisabled: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func,
  handleComponentUnmount: React.PropTypes.func,
  handleClick: React.PropTypes.func,
  handleEdit: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmSensorComponent);
