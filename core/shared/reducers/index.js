"use strict";

import { combineReducers } from 'redux';

export default combineReducers({
  content:  require('./content'),
  url:      require('./url'),
  method:   require('./method'),
  payload:  require('./payload'),
  user:     require('./user')
});
