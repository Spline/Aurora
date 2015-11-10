"use strict";

var URL_CHANGE;

({ URL_CHANGE } = require(__ROOT + 'core/shared/actions'));

function url(state = '/', action) {
  switch (action.type) {
    case URL_CHANGE:
      return action.url;
    default:
      return state;
  }
}

export default url;
