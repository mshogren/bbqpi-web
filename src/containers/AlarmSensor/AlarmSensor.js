import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Bell from '../../components/Bell/Bell';
import { listenForSensorChanges } from '../../redux/modules/currentSensorState';

const mapStateToProps = (state, ownProps) => {
  if (state.currentSensorState[ownProps.channel]) {
    const {
      currentTemperature,
      targetTemperature,
      alarmDisabled,
    } = state.currentSensorState[ownProps.channel];

    const bellProps = {
      on: !alarmDisabled,
    };

    const bell = (
      <Bell {...bellProps} />
    );

    return {
      title: 'Meat Temperature',
      label: 'Alarm',
      icon: bell,
      max: 225,
      currentTemperature: -currentTemperature,
      setTemperature: targetTemperature,
      sliderDisabled: alarmDisabled,
    };
  }

  return { loading: true };
};

const mapDispatchToProps = dispatch => ({
  handleComponentEvent: () => {
    dispatch(listenForSensorChanges(2));
  },
});

class AlarmSensorComponent extends Component {
  componentWillMount() {
    const { handleComponentEvent } = this.props;
    handleComponentEvent();
  }

  render() {
    const { loading } = this.props;
    return loading ? (
      <div />
    ) : (
      <Sensor {...this.props} />
    );
  }
}

AlarmSensorComponent.propTypes = {
  loading: React.PropTypes.bool,
  handleComponentEvent: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlarmSensorComponent);
