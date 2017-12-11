import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import './TemperatureSlider.css';

const SliderHandle = function SliderHandle(props) {
  const { Handle } = Slider;
  const { value, offset } = props;

  const handleStyle = {
    left: `${offset}%`,
  };

  return (
    <div className="my-rc-slider-handle" style={handleStyle}>
      {value}°F<Handle value={value} />
    </div>
  );
};

SliderHandle.propTypes = {
  value: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

const TemperatureSlider = function TemperatureSlider(props) {
  return <Slider {...props} handle={SliderHandle} />;
};

TemperatureSlider.propTypes = {
  disabled: PropTypes.bool,
};

TemperatureSlider.defaultProps = {
  disabled: false,
};

export default TemperatureSlider;
