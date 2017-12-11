import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AlarmSensor from '../AlarmSensor/AlarmSensor';
import Add from '../../components/Add/Add';
import SensorDialog from '../../components/SensorDialog/SensorDialog';
import { listenForChanges } from '../../redux/modules/alarmSensors';
import { addSensor, reorderSensors } from '../../redux/dbActions';
import { toggleSensorDialog } from '../../redux/modules/ui';

const mapStateToProps = (state) => {
  const { alarmSensors, ui } = state;

  return {
    alarmSensors,
    isDialogOpen: ui.isSensorDialogOpen,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleComponentMount: () => {
    dispatch(listenForChanges());
  },
  handleReorder: ({ oldIndex, newIndex }) => {
    dispatch(reorderSensors(oldIndex, newIndex));
  },
  handleDialogToggle: () => {
    dispatch(toggleSensorDialog());
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
          {items.map((value, index) => (
            <SortableItem
              key={value.props.sensorId}
              index={index}
              value={value}
            />
          ))}
        </div>
      ));

      const sensorIds = Object.keys(alarmSensors).sort(
        (a, b) => alarmSensors[a].order - alarmSensors[b].order
      );

      const sensors = sensorIds.map((key) => (
        <AlarmSensor sensorId={key} {...alarmSensors[key]} />
      ));

      const addButton =
        sensorIds.length < 3 ? (
          <Add handleClick={handleDialogToggle} />
        ) : (
          <div />
        );

      const availableChannels = sensorIds.map(
        (key) => alarmSensors[key].channel
      );

      const dialogProps = {
        isDialogOpen,
        availableChannels,
        handleToggle: handleDialogToggle,
        handleClick: handleDialogClick,
      };

      return (
        <div>
          <SortableList
            items={sensors}
            pressDelay={100}
            onSortEnd={handleReorder}
          />
          {addButton}
          <SensorDialog {...dialogProps} />
        </div>
      );
    }

    return <div />;
  }
}

AlarmSensorsComponent.propTypes = {
  alarmSensors: PropTypes.shape({}),
  isDialogOpen: PropTypes.bool.isRequired,
  handleComponentMount: PropTypes.func.isRequired,
  handleDialogToggle: PropTypes.func.isRequired,
  handleDialogClick: PropTypes.func.isRequired,
  handleReorder: PropTypes.func.isRequired,
};

AlarmSensorsComponent.defaultProps = {
  alarmSensors: undefined,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(
  AlarmSensorsComponent
);

export default AlarmSensors;
