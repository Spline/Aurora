"use strict";

import { createStore }  from 'redux';
import reducers         from '../shared/reducers';
import riot             from 'riot';

import backend from '../shared/components/backend.tag';

riot.mount('app > *', {
  isClient: true,
  routes: window.routes,
  store: createStore(reducers, window.initialState),
  state: window.initialState
});
