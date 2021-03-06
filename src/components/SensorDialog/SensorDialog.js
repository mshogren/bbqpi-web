import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  ButtonGroup,
  Button,
} from 'reactstrap';

const SensorDialog = function SensorDialog(props) {
  const { isDialogOpen, availableChannels, handleToggle, handleClick } = props;

  const buttons = [1, 2, 3].map((i) => {
    const label = String.fromCharCode(9311 + i);

    const disabled = availableChannels.indexOf(i) >= 0;
    const onClick = () => {
      handleClick(i);
      handleToggle();
    };

    return (
      <Button key={i} disabled={disabled} onClick={onClick}>
        <h5>{label}</h5>
      </Button>
    );
  });

  return (
    <Modal isOpen={isDialogOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Add Sensor</ModalHeader>
      <ModalBody>
        <Container>
          <Row>Which channel is the sensor plugged into?</Row>
          <Row>
            <ButtonGroup>{buttons}</ButtonGroup>
          </Row>
        </Container>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

SensorDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  availableChannels: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SensorDialog;
