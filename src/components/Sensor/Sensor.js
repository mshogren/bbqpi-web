import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TemperatureSlider from '../TemperatureSlider/TemperatureSlider';

const Sensor = function Sensor(props) {
  const {
    title,
    label,
    icon,
    currentTemperature,
    setTemperature,
    handleChange,
    sliderDisabled,
  } = props;

  const currentSliderProps = {
    ...props,
    value: currentTemperature,
  };

  const targetSliderProps = {
    ...props,
    defaultValue: setTemperature,
    disabled: sliderDisabled,
    onAfterChange: handleChange,
  };

  return (
    <Container>
      <Row style={{ paddingTop: '0.5em', paddingBottom: '1em' }}>
        <Col xs={10}>
          <h5>{ title }</h5>
        </Col>
        <Col xs={2}>
          { icon }
        </Col>
      </Row>
      <Row style={{ paddingBottom: '1em' }}>
        <Col xs={2}>
          <p style={{ fontSize: '10px' }}>Current</p>
        </Col>
        <Col xs={10}>
          <TemperatureSlider {...currentSliderProps} />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '1em' }}>
        <Col xs={2}>
          <p style={{ fontSize: '10px' }}>{label}</p>
        </Col>
        <Col xs={10}>
          <TemperatureSlider {...targetSliderProps} />
        </Col>
      </Row>
    </Container>
  );
};

Sensor.propTypes = {
  title: React.PropTypes.string,
  label: React.PropTypes.string,
  icon: React.PropTypes.element,
  currentTemperature: React.PropTypes.number,
  setTemperature: React.PropTypes.number,
  handleChange: React.PropTypes.func,
  sliderDisabled: React.PropTypes.bool,
};

Sensor.defaultProps = {
  currentTemperature: 0,
  setTemperature: 0,
};

export default Sensor;
