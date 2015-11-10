"use strict";

var actionsSet = new Set([
  'CONTENT_CHANGE',
  'URL_CHANGE',
  'USER_LOGIN',
  'USER_LOGOUT'
]);

var actionsObj = {};

for (let action of actionsSet) {
  actionsObj[action] = action;
}

const actions = actionsObj;

export default actions;
