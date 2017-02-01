import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TemperatureSlider from '../TemperatureSlider/TemperatureSlider';
import Thermometer from '../Thermometer/Thermometer';

const Sensor = function Sensor(props) {
  const {
    title,
    cornerIcon,
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
    <Container style={{ borderBottom: '1px solid #eeeeee' }}>
      <Row style={{ paddingTop: '0.5em', paddingBottom: '0.25em' }}>
        <Col xs={11}>
          <h5>{ title }</h5>
        </Col>
        <Col xs={1}>
          {cornerIcon}
        </Col>
      </Row>
      <Row style={{ paddingBottom: '0.5em' }}>
        <Col xs={2}>
          <Thermometer />
        </Col>
        <Col xs={9}>
          <TemperatureSlider {...currentSliderProps} />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '0.5em' }}>
        <Col xs={2}>
          { icon }
        </Col>
        <Col xs={9}>
          <TemperatureSlider {...targetSliderProps} />
        </Col>
      </Row>
    </Container>
  );
};

Sensor.propTypes = {
  title: React.PropTypes.node,
  cornerIcon: React.PropTypes.element,
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
