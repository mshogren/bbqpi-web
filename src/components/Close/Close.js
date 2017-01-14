import React from 'react';

const Close = function Bell(props) {
  const { handleClick } = props;

  return (
    <button type="button" onClick={handleClick} className="close" aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
  );
};

Close.propTypes = {
  handleClick: React.PropTypes.func,
};

export default Close;
