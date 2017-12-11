import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import TemperatureSlider from '../TemperatureSlider/TemperatureSlider';
import Thermometer from '../Thermometer/Thermometer';

const Sensor = function Sensor(props) {
  const {
    title,
    cornerIcon,
    icon,
    channel,
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

  const linkTo = `/chart/${channel}`;

  return (
    <Container style={{ borderBottom: '1px solid #eeeeee' }}>
      <Row style={{ paddingTop: '0.5em', paddingBottom: '0.25em' }}>
        <Col xs={11}>
          <h5>{title}</h5>
        </Col>
        <Col xs={1}>{cornerIcon}</Col>
      </Row>
      <Row style={{ paddingBottom: '0.5em' }}>
        <Col xs={2}>
          <Link to={linkTo}>
            <Thermometer />
          </Link>
        </Col>
        <Col xs={9}>
          <TemperatureSlider {...currentSliderProps} />
        </Col>
      </Row>
      <Row style={{ paddingBottom: '0.5em' }}>
        <Col xs={2}>{icon}</Col>
        <Col xs={9}>
          <TemperatureSlider {...targetSliderProps} />
        </Col>
      </Row>
    </Container>
  );
};

Sensor.propTypes = {
  title: PropTypes.node.isRequired,
  cornerIcon: PropTypes.element,
  icon: PropTypes.element,
  channel: PropTypes.number.isRequired,
  currentTemperature: PropTypes.number,
  setTemperature: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  sliderDisabled: PropTypes.bool,
};

Sensor.defaultProps = {
  cornerIcon: '',
  icon: '',
  currentTemperature: 0,
  setTemperature: 0,
  sliderDisabled: false,
};

export default Sensor;
