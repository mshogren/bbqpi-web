import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Dialog = function Dialog(props) {
  const { isDialogOpen, handleToggle } = props;

  return (
    <Modal isOpen={isDialogOpen} toggle={handleToggle}>
      <ModalHeader toggle={handleToggle}>Add Sensor</ModalHeader>
      <ModalBody>
      Test
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

Dialog.propTypes = {
  isDialogOpen: React.PropTypes.bool,
  handleToggle: React.PropTypes.func,
};

export default Dialog;
