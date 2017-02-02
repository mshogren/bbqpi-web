import React from 'react';
import { browserHistory } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import Close from '../Close/Close';

const Chart = function Add() {
  return (
    <Container>
      <Row>
        <Col xs={11}>
          <h5>Title</h5>
        </Col>
        <Col xs={1}>
          <Close handleClick={browserHistory.goBack} />
        </Col>
      </Row>
      <Row />
    </Container>
  );
};

Chart.propTypes = {
};

export default Chart;
