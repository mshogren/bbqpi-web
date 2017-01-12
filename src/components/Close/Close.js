import React from 'react';

const Close = function Bell(props) {
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
    width: '24px',
    height: '24px',
  };

  const color = '#000000';

  return (
    <button style={buttonStyle} onClick={handleClick}>
      <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill={color} d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    </button>
  );
};

Close.propTypes = {
  handleClick: React.PropTypes.func,
};

export default Close;
