import {combineReducers} from 'redux';
import events from './eventReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  events,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
