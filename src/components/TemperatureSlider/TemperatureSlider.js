import React, { Component } from 'react';
import Slider from 'rc-slider';
import './TemperatureSlider.css';

/* eslint-disable react/prefer-stateless-function */
class SliderHandle extends Component {
  render() {
    const { value, offset, disabled } = this.props;

    const handleStyle = {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: '2px',
      border: '2px solid',
      borderColor: disabled ? '#efefef' : '#abe2fb',
      borderRadius: '3px',
      background: '#fff',
      fontSize: '14px',
      textAlign: 'center',
      left: `${offset}%`,
    };

    return (
      <div style={handleStyle}>{value}°F</div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

SliderHandle.propTypes = {
  value: React.PropTypes.node,
  offset: React.PropTypes.number,
  disabled: React.PropTypes.bool,
};

SliderHandle.defaultProps = {
  value: '',
  offset: 0,
  disabled: false,
};

const TemperatureSlider = function TemperatureSlider(props) {
  return (
    <Slider {...props} handle={<SliderHandle disabled={props.disabled} />} />
  );
};

TemperatureSlider.propTypes = {
  disabled: React.PropTypes.bool,
};

TemperatureSlider.defaultProps = {
  disabled: false,
};

export default TemperatureSlider;
