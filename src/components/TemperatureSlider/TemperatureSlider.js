import React from 'react';
import Slider from 'rc-slider';
import './TemperatureSlider.css';

const SliderHandle = function SliderHandle(props) {
  const Handle = Slider.Handle;
  const { value, offset } = props;

  const handleStyle = {
    left: `${offset}%`,
  };

  return (<div className="my-rc-slider-handle" style={handleStyle}>{value}°F<Handle {...props} /></div>);
};

SliderHandle.propTypes = {
  value: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired,
};

const TemperatureSlider = function TemperatureSlider(props) {
  return (
    <Slider {...props} handle={SliderHandle} />
  );
};

TemperatureSlider.propTypes = {
  disabled: React.PropTypes.bool,
};

TemperatureSlider.defaultProps = {
  disabled: false,
};

export default TemperatureSlider;
