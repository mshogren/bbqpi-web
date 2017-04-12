import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Splash from '../../components/Splash/Splash';
import { isReady } from '../../redux/uiActions';
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
      <div>
        {this.props.children}
      </div>
    ) : (
      <Splash />
    );
  }
}

App.propTypes = {
  ready: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  handleComponentMount: PropTypes.func.isRequired,
  handleComponentWillReceiveProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
