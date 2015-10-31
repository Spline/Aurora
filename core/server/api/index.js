"use strict";

var Content = require(__ROOT + 'core/server/api/models/Content');
var User    = require(__ROOT + 'core/server/api/models/User');

const ROUTE_LOGIN       = /\/login/;
const ROUTE_USER        = /\/user/;
const ROUTE_USER_ID     = /\/user\/([^\/]+)\/?/;
const ROUTE_CONTENT     = /\/content/;
const ROUTE_CONTENT_ID  = /\/content\/([^\/]+)\/?/;

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
        return (new Content({ id: queryParams[1] })).toJSON();
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
