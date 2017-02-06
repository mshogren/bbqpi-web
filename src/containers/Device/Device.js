import React, { Component } from 'react';
import { connect } from 'react-redux';
import TargetSensor from '../TargetSensor/TargetSensor';
import AlarmSensors from '../AlarmSensors/AlarmSensors';
import DeviceDialog from '../../components/DeviceDialog/DeviceDialog';
import { setSelectedDevice } from '../../redux/modules/device';
import { toggleDeviceDialog } from '../../redux/modules/ui';

const mapStateToProps = state => ({
  isDialogOpen: state.ui.isDeviceDialogOpen,
  selectedDevice: state.device.selected,
  availableDevices: state.device.available,
});

const mapDispatchToProps = dispatch => ({
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
  componentWillMount() {
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

    const dialogProps = {
      isDialogOpen,
      selectedDevice,
      availableDevices,
      handleToggle,
      handleClick,
    };

    let Display = (<div />);

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
        <DeviceDialog {...dialogProps} />
      </div>
    );
  }
}

Device.propTypes = {
  isDialogOpen: React.PropTypes.bool.isRequired,
  selectedDevice: React.PropTypes.string,
  availableDevices: React.PropTypes.shape({}),
  handleComponentMount: React.PropTypes.func.isRequired,
  handleToggle: React.PropTypes.func.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

Device.defaultProps = {
  selectedDevice: undefined,
  availableDevices: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
