import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Device from '../Device/Device';
import Chart from '../../components/Chart/Chart';
import Splash from '../../components/Splash/Splash';
import { isReady } from '../../redux/uiActions';
import { login } from '../../redux/modules/auth';
import { getAvailableDevices } from '../../redux/modules/device';

const mapStateToProps = (state) => ({
  ready: isReady(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleComponentMount: () => {
    dispatch(login());
  },
  handleComponentWillReceiveProps: () => {
    dispatch(getAvailableDevices());
  },
});

class App extends Component {
  componentDidMount() {
    const { handleComponentMount } = this.props;
    handleComponentMount();
  }

  /* eslint camelcase: "off" */
  UNSAFE_componentWillReceiveProps() {
    const { ready, handleComponentWillReceiveProps } = this.props;
    if (!ready) handleComponentWillReceiveProps();
  }

  render() {
    const { ready } = this.props;

    return ready ? (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Device} />
          <Route path="/chart/:channel" component={Chart} />
        </div>
      </BrowserRouter>
    ) : (
      <Splash />
    );
  }
}

App.propTypes = {
  ready: PropTypes.bool.isRequired,
  handleComponentMount: PropTypes.func.isRequired,
  handleComponentWillReceiveProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
