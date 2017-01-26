import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Device from '../Device/Device';
import Splash from '../../components/Splash/Splash';
import { login } from '../../redux/modules/auth';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

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

    return authenticated ? (
      <Device />
    ) : (
      <Splash />
    );
  }
}

App.propTypes = {
  authenticated: React.PropTypes.bool,
  handleComponentMount: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
