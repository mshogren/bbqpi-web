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
    const { alarmSensors } = this.props;

    if (alarmSensors) {
      const sensors = [];

      Object.keys(alarmSensors).forEach((key) => {
        sensors.push(<AlarmSensor key={key} sensorId={key} {...alarmSensors[key]} />);
      });

      return (
        <div>
          {sensors}
          <Add />
        </div>
      );
    }

    return (
      <div />
    );
  }
}

AlarmSensorsComponent.propTypes = {
  alarmSensors: React.PropTypes.shape({}),
  handleComponentEvent: React.PropTypes.func,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(AlarmSensorsComponent);

export default AlarmSensors;
