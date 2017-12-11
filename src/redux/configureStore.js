import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './modules/reducer';
import { saveDeviceKey } from './localStorageActions';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

export default function configureStore() {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  store.subscribe(() => {
    saveDeviceKey(store.getState());
  });

  return store;
}
