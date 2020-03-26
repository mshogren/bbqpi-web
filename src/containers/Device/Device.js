import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TargetSensor from '../TargetSensor/TargetSensor';
import AlarmSensors from '../AlarmSensors/AlarmSensors';
import DeviceDialog from '../../components/DeviceDialog/DeviceDialog';
import { setSelectedDevice } from '../../redux/modules/device';
import { toggleDeviceDialog } from '../../redux/modules/ui';

const mapStateToProps = (state) => ({
  isDialogOpen: state.ui.isDeviceDialogOpen,
  selectedDevice: state.device.selected,
  availableDevices: state.device.available,
});

const mapDispatchToProps = (dispatch) => ({
  handleComponentMount: () => {
    dispatch(toggleDeviceDialog());
  },
  handleToggle: () => {
    dispatch(toggleDeviceDialog());
  },
  handleClick: (deviceKey) => {
    dispatch(setSelectedDevice(deviceKey));
  },
});

class Device extends Component {
  componentDidMount() {
    const { isDialogOpen, selectedDevice, handleComponentMount } = this.props;
    if (!selectedDevice && !isDialogOpen) handleComponentMount();
  }

  render() {
    const {
      isDialogOpen,
      selectedDevice,
      availableDevices,
      handleToggle,
      handleClick,
    } = this.props;

    let Display = <div />;

    if (selectedDevice) {
      Display = (
        <div>
          <TargetSensor />
          <AlarmSensors />
        </div>
      );
    }

    return (
      <div>
        {Display}
        <DeviceDialog
          isDialogOpen={isDialogOpen}
          selectedDevice={selectedDevice}
          availableDevices={availableDevices}
          handleToggle={handleToggle}
          handleClick={handleClick}
        />
      </div>
    );
  }
}

Device.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  selectedDevice: PropTypes.string,
  availableDevices: PropTypes.shape({}),
  handleComponentMount: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Device.defaultProps = {
  selectedDevice: undefined,
  availableDevices: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
