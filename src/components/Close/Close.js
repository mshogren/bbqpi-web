import React from 'react';
import PropTypes from 'prop-types';

const Close = function Bell(props) {
  const { handleClick } = props;

  return (
    <button type="button" onClick={handleClick} className="close" aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
  );
};

Close.propTypes = {
  handleClick: PropTypes.func,
};

Close.defaultProps = {
  handleClick() {},
};

export default Close;
