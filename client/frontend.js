"use strict";

import { createStore }  from 'redux';
import reducers         from '../shared/reducers';
import riot             from 'riot';

import frontend from '../shared/components/frontend.tag';

riot.mount('app > *', {
  isClient: true,
  routes: window.routes,
  store: createStore(reducers, window.initialState),
  state: window.initialState
});
