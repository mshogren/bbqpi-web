import React, { Component } from 'react';
import { connect } from 'react-redux';
import TargetSensor from '../TargetSensor/TargetSensor';
import AlarmSensors from '../AlarmSensors/AlarmSensors';

const mapStateToProps = state => ({
  deviceKey: state.ui.deviceKey,
});

const mapDispatchToProps = dispatch => ({
  handleComponentMount: () => {
    dispatch(() => {});
  },
});

class App extends Component {
  componentWillMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  render() {
    const { deviceKey } = this.props;

    return deviceKey ? (
      <div>
        <TargetSensor />
        <AlarmSensors />
      </div>
    ) : (
      <div />
    );
  }
}

App.propTypes = {
  deviceKey: React.PropTypes.string,
  handleComponentMount: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
