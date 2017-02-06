import React from 'react';

const Bell = function Bell(props) {
  const { on, handleClick } = props;

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

  const color = on ? '#abe2fb' : '#e9e9e9';

  return (
    <button style={buttonStyle} onClick={handleClick}>
      <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill={color} d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
      </svg>
    </button>
  );
};

Bell.propTypes = {
  on: React.PropTypes.bool,
  handleClick: React.PropTypes.func,
};

Bell.defaultProps = {
  on: false,
  handleClick() {},
};

export default Bell;
