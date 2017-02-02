import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import configureStore from './redux/configureStore';
import App from './containers/App/App';
import Device from './containers/Device/Device';
import Chart from './components/Chart/Chart';

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then((swReg) => {
      console.log('Service Worker is registered', swReg);
    })
    .catch((error) => {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
}

const store = configureStore();

const isAvailable = (nextState, replace) => {
  const channel = Number(nextState.params.channel);
  const alarmSensors = store.getState().alarmSensors;

  const isSensorSetupOnChannel = channel === 0
    || (alarmSensors
      && Object.keys(alarmSensors).every(key => alarmSensors[key].channel === channel));

  if (!isSensorSetupOnChannel) {
    replace({ pathName: '/' });
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Device} />
        <Route path="chart/:channel" component={Chart} onEnter={isAvailable} />
      </Route>
      <Redirect from="/*" to="/" />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
