import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlarmSensor from '../AlarmSensor/AlarmSensor';
import Add from '../../components/Add/Add';
import Dialog from '../../components/Dialog/Dialog';
import { listenForChanges } from '../../redux/modules/alarmSensors';
import { addSensor } from '../../redux/dbActions';
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
  // handleReorder: ({ oldIndex, newIndex }) => {
  //  dispatch(reorderSensors(oldIndex, newIndex));
  // },
  handleDialogToggle: () => {
    dispatch(toggleDialog());
  },
  handleDialogClick: (channel) => {
    dispatch(addSensor(channel));
  },
});

class AlarmSensorsComponent extends Component {
  componentWillMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  render() {
    const {
      alarmSensors,
      isDialogOpen,
      handleDialogToggle,
      handleDialogClick,
    } = this.props;

    if (alarmSensors) {
      const sensorIds = Object.keys(alarmSensors);

      const sensors = sensorIds.map(key => (
        <AlarmSensor key={key} sensorId={key} {...alarmSensors[key]} />
      ));

      const addButton = sensorIds.length < 3 ? <Add handleClick={handleDialogToggle} /> : <div />;

      const availableChannels = sensorIds.map(key => (
        alarmSensors[key].channel
      ));

      const dialogProps = {
        isDialogOpen,
        availableChannels,
        handleToggle: handleDialogToggle,
        handleClick: handleDialogClick,
      };

      return (
        <div>
          {sensors}
          {addButton}
          <Dialog {...dialogProps} />
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
  handleDialogClick: React.PropTypes.func,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(AlarmSensorsComponent);

export default AlarmSensors;
