import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import TargetSensor from '../TargetSensor/TargetSensor';
import AlarmSensors from '../AlarmSensors/AlarmSensors';
import { login } from '../../redux/modules/auth';

const mapStateToProps = state => (
  { authenticated: state.auth.authenticated }
);

const mapDispatchToProps = dispatch => ({
  handleComponentMount: () => {
    dispatch(login());
  },
});

class App extends Component {
  componentWillMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  render() {
    const { authenticated } = this.props;

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

    return authenticated ? (
      <div>
        <TargetSensor />
        <AlarmSensors />
      </div>
    ) : (
      <div>
        <img style={style} src={uri} alt={alt} />
      </div>
    );
  }
}

App.propTypes = {
  authenticated: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
