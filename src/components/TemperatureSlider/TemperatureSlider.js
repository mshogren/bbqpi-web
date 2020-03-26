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
      {value}
      °F
      <Handle value={value} />
    </div>
  );
};

SliderHandle.propTypes = {
  value: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

const TemperatureSlider = function TemperatureSlider(props) {
  const { value, defaultValue, max, disabled, onAfterChange } = props;

  return typeof value !== 'undefined' ? (
    <Slider
      value={value}
      max={max}
      disabled={disabled}
      onAfterChange={onAfterChange}
      handle={SliderHandle}
    />
  ) : (
    <Slider
      defaultValue={defaultValue}
      max={max}
      disabled={disabled}
      onAfterChange={onAfterChange}
      handle={SliderHandle}
    />
  );
};

TemperatureSlider.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  onAfterChange: PropTypes.func,
};

TemperatureSlider.defaultProps = {
  value: undefined,
  defaultValue: undefined,
  max: undefined,
  disabled: false,
  onAfterChange: () => {},
};

export default TemperatureSlider;
