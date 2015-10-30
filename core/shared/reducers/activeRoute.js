"use strict";

var ROUTE_CHANGE;

({ ROUTE_CHANGE } = require(__ROOT + 'core/shared/actions'));

function activeRoute(state = {}, action) {
  switch (action.type) {
    case ROUTE_CHANGE:
      return action.activeRoute;
    default:
      return state;
  }
}

export default activeRoute;
