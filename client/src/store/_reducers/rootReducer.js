import { combineReducers } from 'redux';
import authReducer from './authReducer';
import padReducer from './padReducer';
import shiftReducer from './shiftReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  mypad: padReducer,
  myshift: shiftReducer,
  mybooking: bookingReducer,
});

export default rootReducer;
