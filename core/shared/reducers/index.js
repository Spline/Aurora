"use strict";

import { combineReducers } from 'redux';

export default combineReducers({
  content:  require('./content'),
  url:      require('./url'),
  user:     require('./user')
});
