import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const logger = createLogger();
let enhancer = compose(
  applyMiddleware(routerMiddleware(history), thunk, logger, reduxImmutableStateInvariant()),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState) {

  // return createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(thunk, reduxImmutableStateInvariant())
  // );
  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
