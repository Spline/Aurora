"use strict";

var CONTENT_CHANGE;

({ CONTENT_CHANGE } = require(__ROOT + '/core/shared/actions'));

function content(state = {}, action) {
  switch (action.type) {
    case CONTENT_CHANGE:
      return action.content;
    default:
      return state;
  }
}

export default content;
