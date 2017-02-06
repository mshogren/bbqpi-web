import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { Chart as ChartComponent } from 'react-google-charts';
import Close from '../Close/Close';
import { getBaseRef } from '../../redux/dbActions';

const mapStateToProps = state => (
  state
);

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const channel = Number(this.props.params.channel);

    const initialRef = getBaseRef(this.props).child('state')
      .orderByChild('channel');

    let maxKey;
    initialRef.equalTo(channel).once('value', (snapshot) => {
      const rows = [];
      let maxTime = 0;
      let lastTargetTemperature;
      snapshot.forEach((child) => {
        maxKey = child.key;
        const { timestamp, currentTemperature, targetTemperature } = child.val();
        if ((timestamp >= maxTime + 30000) || (targetTemperature !== lastTargetTemperature)) {
          maxTime = timestamp;
          lastTargetTemperature = targetTemperature;
          const time = new Date(timestamp);
          rows.push([time, currentTemperature, targetTemperature]);
        }
      });

      this.setState({
        data: [
          ...this.state.data,
          ...rows,
        ],
        maxTime,
      });

      this.queryRef = initialRef.startAt(channel, maxKey).endAt(channel);

      this.queryRef.on('child_added', (snapshot2) => {
        const {
          timestamp: timestamp2,
          currentTemperature: currentTemperature2,
          targetTemperature: targetTemperature2,
        } = snapshot2.val();
        if ((timestamp2 >= maxTime + 30000) || (targetTemperature2 !== lastTargetTemperature)) {
          maxTime = timestamp2;
          lastTargetTemperature = targetTemperature2;
          const time2 = new Date(timestamp2);
          this.setState({
            data: [
              ...this.state.data,
              [time2, currentTemperature2, targetTemperature2],
            ],
            maxTime,
          });
        }
      });
    });
  }

  componentWillUnmount() {
    this.queryRef.off('child_added');
  }

  render() {
    if (this.state.data.length <= 0) {
      return (<div />);
    }

    let title = 'Grill Temperature';
    const channel = Number(this.props.params.channel);
    const sensorKey = Object.keys(this.props.alarmSensors).find(key => (
      this.props.alarmSensors[key].channel === channel
    ));

    if (sensorKey) title = this.props.alarmSensors[sensorKey].name;

    const chartProps = {
      // chartPackages: ['corechart', 'line'],
      chartType: 'LineChart',
      columns: [
        { type: 'datetime', label: 'Time' },
        { type: 'number', label: 'Current Temperature' },
        { type: 'number', label: 'Target Temperature' },
      ],
      rows: this.state.data,
      options: {
        titlePosition: 'none',
        legend: 'none',
        hAxis: {
          title: 'Time',
          format: 'HH:mm',
          viewWindow: {
            min: new Date(this.state.maxTime - (1000 * 60 * 60 * 2)),
            max: new Date(this.state.maxTime),
          },
        },
        vAxis: { title: '°F', minValue: 0, maxValue: 225 },
      },
      width: '100%',
      height: '400px',
    };

    return (
      <Container>
        <Row style={{ paddingTop: '0.5em', paddingBottom: '0.25em' }}>
          <Col xs={11}>
            <h5>{title}</h5>
          </Col>
          <Col xs={1}>
            <Close handleClick={browserHistory.goBack} />
          </Col>
        </Row>
        <Row>
          <ChartComponent {...chartProps} />
        </Row>
      </Container>
    );
  }
}

Chart.propTypes = {
  params: React.PropTypes.shape({
    channel: React.PropTypes.string,
  }).isRequired,
  alarmSensors: React.PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Chart);
