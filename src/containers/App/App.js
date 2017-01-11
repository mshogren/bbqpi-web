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
  handleComponentEvent: () => {
    dispatch(login());
  },
});

class App extends Component {
  componentWillMount() {
    const { handleComponentEvent } = this.props;
    handleComponentEvent();
  }

  render() {
    const { authenticated } = this.props;

    return authenticated ? (
      <div>
        <TargetSensor />
        <AlarmSensors />
      </div>
    ) : (
      <div>Logging in</div>
    );
  }
}

App.propTypes = {
  authenticated: React.PropTypes.bool,
  handleComponentEvent: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
