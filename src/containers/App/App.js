import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Device from '../Device/Device';
import Splash from '../../components/Splash/Splash';
import isReady from '../../redux/uiActions';
import { login } from '../../redux/modules/auth';
import { getAvailableDevices } from '../../redux/modules/device';

const mapStateToProps = state => ({
  ready: isReady(state),
});

const mapDispatchToProps = dispatch => ({
  handleComponentMount: () => {
    dispatch(login());
  },
  handleComponentWillReceiveProps: () => {
    dispatch(getAvailableDevices());
  },
});

class App extends Component {
  componentWillMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  componentWillReceiveProps() {
    const { ready, handleComponentWillReceiveProps } = this.props;
    if (!ready) handleComponentWillReceiveProps();
  }

  render() {
    const { ready } = this.props;

    return ready ? (
      <Device />
    ) : (
      <Splash />
    );
  }
}

App.propTypes = {
  ready: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func,
  handleComponentWillReceiveProps: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
