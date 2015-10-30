"use strict";

import { createStore }  from 'redux';
import riot             from 'riot';

var frontend = require(__ROOT + 'themes/frontend/australis/components/index.tag');
var reducers = require(__ROOT + 'core/shared/reducers');

riot.mount('app > *', {
  isClient: true,
  routes: window.routes,
  store: createStore(reducers, window.initialState),
  state: window.initialState
});
