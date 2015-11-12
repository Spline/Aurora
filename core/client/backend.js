"use strict";

var createStore = require('redux').createStore;
var riot = require('riot');

var backend   = require(__ROOT + 'themes/backend/borealis/components/index.tag');
var reducers  = require(__ROOT + 'core/shared/reducers');

riot.mount('app > *', {
  isClient: true,
  routes: window.routes,
  store: createStore(reducers, window.initialState),
  state: window.initialState
});
