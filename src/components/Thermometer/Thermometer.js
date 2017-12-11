import React from 'react';
import PropTypes from 'prop-types';

const Thermometer = function Thermometer(props) {
  const { handleClick } = props;

  const buttonStyle = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    display: 'block',
    margin: '0 auto',
  };

  const svgStyle = {
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
    width: '32px',
    height: '32px',
  };

  const color = '#abe2fb';

  return (
    <button style={buttonStyle} onClick={handleClick}>
      <svg
        style={svgStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          d="M17,17A5,5 0 0,1 12,22A5,5 0 0,1 7,17C7,15.36 7.79,13.91 9,13V5A3,3 0 0,1 12,2A3,3 0 0,1 15,5V13C16.21,13.91 17,15.36 17,17M11,8V14.17C9.83,14.58 9,15.69 9,17A3,3 0 0,0 12,20A3,3 0 0,0 15,17C15,15.69 14.17,14.58 13,14.17V8H11Z"
        />
      </svg>
    </button>
  );
};

Thermometer.propTypes = {
  handleClick: PropTypes.func,
};

Thermometer.defaultProps = {
  handleClick() {},
};

export default Thermometer;
