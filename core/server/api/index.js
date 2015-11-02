"use strict";

var Content = require(__ROOT + 'core/server/api/models/Content');
var User    = require(__ROOT + 'core/server/api/models/User');

const REGEX_NUMBER = '([0-9]+){1,8}';

const ROUTE_LOGIN      = new RegExp(`/login/`);

const ROUTE_USER       = new RegExp(`/user/`);
const ROUTE_USER_ID    = new RegExp(`/user/${REGEX_NUMBER}`);

const ROUTE_CONTENT    = new RegExp(`/content`);
const ROUTE_CONTENT_ID = new RegExp(`/content/${REGEX_NUMBER}`);

export default async function(route, params = { method: 'GET' }) {
  let queryParams;

  switch (params.method.toUpperCase()) {
    case 'GET':
      /* Route: /user/:id */
      if (queryParams = route.match(ROUTE_USER_ID)) {
        return (new User({ id: queryParams[1] })).toJSON();
      }

      /* Route: /content/:id */
      if (queryParams = route.match(ROUTE_CONTENT_ID)) {
        console.log(queryParams);
        let content = new Content({ id: queryParams[1] });
        return (await content.fetch()).toJSON();
      }

      break;

    case 'POST':
      /* Route: /login */
      if (route.match(ROUTE_LOGIN)) {
        return (await User.login(params.payload)).toJSON();
      }

      /* Route: /user */
      if (route.match(ROUTE_USER)) {}

      /* Route: /content */
      if (route.match(ROUTE_CONTENT)) {}

      break;
  }

  /* No matching route found */
  return null;
}
