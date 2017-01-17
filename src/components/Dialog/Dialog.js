import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, ButtonGroup, Button } from 'reactstrap';

const Dialog = function Dialog(props) {
  const { isDialogOpen, handleToggle, handleClick } = props;

  const buttons = [1, 2, 3].map((i) => {
    const label = String.fromCharCode(9311 + i);

    const buttonProps = {
      key: i,
      disabled: false,
      onClick: () => {
        handleClick(i);
        handleToggle();
      },
    };

    return (<Button {...buttonProps}>{label}</Button>);
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

Dialog.propTypes = {
  isDialogOpen: React.PropTypes.bool,
  handleToggle: React.PropTypes.func,
  handleClick: React.PropTypes.func,
};

export default Dialog;
