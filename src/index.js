import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './containers/App/App';

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
