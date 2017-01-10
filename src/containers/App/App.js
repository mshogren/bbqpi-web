import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import TargetSensor from '../TargetSensor/TargetSensor';
import { login } from '../../redux/modules/targetSensor';

const mapStateToProps = state => (
  { loaded: state.targetSensor.loaded }
);

class App extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(login());
  }

  render() {
    const { loaded } = this.props;
    const message = loaded ? 'Loaded' : 'Not loaded';

    return loaded ? (
      <div>
        <TargetSensor />
      </div>
    ) : (
      <div>{message}</div>
    );
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func,
  loaded: React.PropTypes.bool,
};

export default connect(mapStateToProps)(App);
