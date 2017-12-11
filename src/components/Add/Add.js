import React from 'react';
import PropTypes from 'prop-types';

const Add = function Add(props) {
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
    margin: '31 auto',
    width: '64px',
    height: '64px',
  };

  const color = '#e9e9e9';

  return (
    <button style={buttonStyle} onClick={handleClick}>
      <svg
        style={svgStyle}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
        />
      </svg>
    </button>
  );
};

Add.propTypes = {
  handleClick: PropTypes.func,
};

Add.defaultProps = {
  handleClick() {},
};

export default Add;
