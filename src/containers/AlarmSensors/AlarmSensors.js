import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlarmSensor from '../AlarmSensor/AlarmSensor';
import Add from '../../components/Add/Add';
import { listenForChanges } from '../../redux/modules/alarmSensors';

const mapStateToProps = (state) => {
  const { alarmSensors } = state;

  return { alarmSensors };
};

const mapDispatchToProps = dispatch => ({
  handleComponentEvent: () => {
    dispatch(listenForChanges());
  },
});

class AlarmSensorsComponent extends Component {
  componentWillMount() {
    const { handleComponentEvent } = this.props;
    handleComponentEvent();
  }

  render() {
    const sensors = [];
    this.props.alarmSensors.forEach((sensor, index) => {
      sensors.push(<AlarmSensor key={index} channel={sensor.channel} />);
    });

    return (
      <div>
        {sensors}
        <Add />
      </div>
    );
  }
}

AlarmSensorsComponent.propTypes = {
  alarmSensors: React.PropTypes.arrayOf(React.PropTypes.object),
  handleComponentEvent: React.PropTypes.func,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(AlarmSensorsComponent);

export default AlarmSensors;
