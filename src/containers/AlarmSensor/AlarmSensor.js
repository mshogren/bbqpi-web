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

    return (
      <Sensor {...this.props} title={inlineEditor} cornerIcon={close} icon={bell} />
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
  handleClose: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmSensorComponent);
