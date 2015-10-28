"use strict";

import { ROUTE_CHANGE } from '../actions';

function activeRoute(state = {}, action) {
  switch (action.type) {
    case ROUTE_CHANGE:
      return action.activeRoute;
    default:
      return state;
  }
}

export default activeRoute;
