import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sensor from '../../components/Sensor/Sensor';
import Fan from '../../components/Fan/Fan';
import { listenForSensorChanges } from '../../redux/modules/currentSensorState';
import { setTargetTemperature } from '../../redux/dbActions';

const mapStateToProps = (state) => {
  if (state.currentSensorState['0']) {
    const { currentTemperature, targetTemperature, fan } = state.currentSensorState['0'];
    return {
      title: 'Grill Temperature',
      icon: (<Fan on={fan} />),
      max: 450,
      currentTemperature,
      setTemperature: targetTemperature,
    };
  }

  return { loading: true };
};

const mapDispatchToProps = dispatch => ({
  handleChange: (value) => {
    dispatch(setTargetTemperature(value));
  },
  handleComponentEvent: () => {
    dispatch(listenForSensorChanges(0));
  },
});

class TargetSensorComponent extends Component {
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

TargetSensorComponent.propTypes = {
  loading: React.PropTypes.bool,
  handleComponentEvent: React.PropTypes.func,
};

const TargetSensor = connect(mapStateToProps, mapDispatchToProps)(TargetSensorComponent);

export default TargetSensor;
