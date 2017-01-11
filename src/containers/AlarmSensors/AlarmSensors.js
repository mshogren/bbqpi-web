import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenForChanges } from '../../redux/modules/alarmSensors';

const mapStateToProps = (state) => {
  const { alarmSensors } = state;

  return { alarmSensors };
};

const mapDispatchToProps = dispatch => ({
  handleComponentEvent: () => {
    dispatch(listenForChanges());
  },
});

class AlarmSensorsComponent extends Component {
  componentWillMount() {
    const { handleComponentEvent } = this.props;
    handleComponentEvent();
  }

  render() {
    const sensors = [];
    this.props.alarmSensors.forEach(() => {
      sensors.push(<div />);
    });

    return (
      <div>{sensors}</div>
    );
  }
}

AlarmSensorsComponent.propTypes = {
  alarmSensors: React.PropTypes.arrayOf(React.PropTypes.object),
  handleComponentEvent: React.PropTypes.func,
};

const AlarmSensors = connect(mapStateToProps, mapDispatchToProps)(AlarmSensorsComponent);

export default AlarmSensors;
