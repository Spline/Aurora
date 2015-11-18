"use strict";

var USER_LOGIN;
var USER_LOGOUT;

({ USER_LOGIN, USER_LOGOUT } = require(__ROOT + '/core/shared/actions'));

function user(state = null, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.user;
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
}

export default user;
