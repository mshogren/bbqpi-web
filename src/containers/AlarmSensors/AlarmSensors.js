import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlarmSensor from '../AlarmSensor/AlarmSensor';
import Add from '../../components/Add/Add';
import Dialog from '../../components/Dialog/Dialog';
import { listenForChanges } from '../../redux/modules/alarmSensors';
import { toggleDialog } from '../../redux/modules/ui';

const mapStateToProps = (state) => {
  const { alarmSensors, ui } = state;

  return {
    alarmSensors,
    isDialogOpen: ui.isDialogOpen,
  };
};

const mapDispatchToProps = dispatch => ({
  handleComponentMount: () => {
    dispatch(listenForChanges());
  },
  handleDialogToggle: () => {
    dispatch(toggleDialog());
  },
});

class AlarmSensorsComponent extends Component {
  componentWillMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  render() {
    const { alarmSensors, isDialogOpen, handleDialogToggle } = this.props;

    if (alarmSensors) {
      const sensors = [];

      Object.keys(alarmSensors).forEach((key) => {
        sensors.push(<AlarmSensor key={key} sensorId={key} {...alarmSensors[key]} />);
      });

      return (
        <div>
          {sensors}
          <Add handleClick={handleDialogToggle} />
          <Dialog isDialogOpen={isDialogOpen} handleToggle={handleDialogToggle} />
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
  handleComponentMount: React.PropTypes.func,
  isDialogOpen: React.PropTypes.bool,
  handleDialogToggle: React.PropTypes.func,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(AlarmSensorsComponent);

export default AlarmSensors;
