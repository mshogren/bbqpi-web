import React from 'react';

const Splash = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '192px',
    height: '192px',
    marginTop: '-96px',
    marginLeft: '-96px',
  };

  const uri = '/android-chrome-192x192.png';
  const alt = 'Logging In';

  return (
    <div>
      <img style={style} src={uri} alt={alt} />
    </div>
  );
};

export default Splash;
