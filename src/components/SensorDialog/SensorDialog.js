import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, ButtonGroup, Button } from 'reactstrap';

const SensorDialog = function SensorDialog(props) {
  const { isDialogOpen, availableChannels, handleToggle, handleClick } = props;

  const buttons = [1, 2, 3].map((i) => {
    const label = String.fromCharCode(9311 + i);

    const buttonProps = {
      key: i,
      disabled: availableChannels.indexOf(i) >= 0,
      onClick: () => {
        handleClick(i);
        handleToggle();
      },
    };

    return (
      <Button {...buttonProps}>
        <h5>
          {label}
        </h5>
      </Button>
    );
  });

  return (
    <Modal isOpen={isDialogOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Add Sensor</ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            Which channel is the sensor plugged into?
          </Row>
          <Row>
            <ButtonGroup>
              {buttons}
            </ButtonGroup>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

SensorDialog.propTypes = {
  isDialogOpen: React.PropTypes.bool.isRequired,
  availableChannels: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  handleToggle: React.PropTypes.func.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default SensorDialog;
