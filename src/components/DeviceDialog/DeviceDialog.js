import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, ButtonGroup, Button } from 'reactstrap';

const DeviceDialog = function DeviceDialog(props) {
  const { isDialogOpen, availableDevices, selectedDevice, handleToggle, handleClick } = props;

  const deviceKeys = availableDevices ? Object.keys(availableDevices) : [];

  if (deviceKeys.length === 0) {
    return (
      <Modal isOpen={isDialogOpen} toggle={handleToggle}>
        <ModalHeader>No Devices Available</ModalHeader>
        <ModalBody>
          Please ensure that your BBQ-Pi device is powered on and logged in.
          Once that is done come back here and refresh the browser.
        </ModalBody>
      </Modal>
    );
  }

  let handleToggleFinal;
  if (selectedDevice) handleToggleFinal = handleToggle;

  const buttons = deviceKeys.map((deviceKey) => {
    const buttonProps = {
      key: deviceKey,
      onClick: () => {
        handleClick(deviceKey);
        handleToggle();
      },
      active: deviceKey === selectedDevice,
    };

    return (
      <Button {...buttonProps}>{availableDevices[deviceKey].name || 'New Device'}</Button>
    );
  });

  return (
    <Modal isOpen={isDialogOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggleFinal}>Choose Device</ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            Please choose a BBQ-Pi device?
          </Row>
          <Row>
            <ButtonGroup vertical>
              {buttons}
            </ButtonGroup>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

DeviceDialog.propTypes = {
  isDialogOpen: React.PropTypes.bool,
  availableDevices: React.PropTypes.shape({}),
  selectedDevice: React.PropTypes.string,
  handleToggle: React.PropTypes.func,
  handleClick: React.PropTypes.func,
};

export default DeviceDialog;
