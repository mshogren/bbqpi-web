import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AlarmSensor from '../AlarmSensor/AlarmSensor';
import Add from '../../components/Add/Add';
import Dialog from '../../components/Dialog/Dialog';
import { listenForChanges } from '../../redux/modules/alarmSensors';
import { addSensor, reorderSensors } from '../../redux/dbActions';
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
  handleReorder: ({ oldIndex, newIndex }) => {
    dispatch(reorderSensors(oldIndex, newIndex));
  },
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
      handleReorder,
    } = this.props;

    if (alarmSensors) {
      const SortableItem = SortableElement(({ value }) => <div>{value}</div>);
      const SortableList = SortableContainer(({ items }) => (
        <div>
          {items.map((value, index) =>
            <SortableItem key={index} index={index} value={value} />,
          )}
        </div>
      ));

      const sensors = Object.keys(alarmSensors).map(key => (
        <AlarmSensor key={key} sensorId={key} {...alarmSensors[key]} />
      ));

      const availableChannels = Object.keys(alarmSensors).map(key => (
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
          <SortableList items={sensors} pressDelay={100} onSortEnd={handleReorder} />
          <Add handleClick={handleDialogToggle} />
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
  handleReorder: React.PropTypes.func,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(AlarmSensorsComponent);

export default AlarmSensors;
