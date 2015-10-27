"use strict";

import User    from './models/user';
import Content from './models/content';

const ROUTE_USER       = /\/user/;
const ROUTE_USER_ID    = /\/user\/([^\/]+)\/?/;
const ROUTE_CONTENT    = /\/content/;
const ROUTE_CONTENT_ID = /\/content\/([^\/]+)\/?/;

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
      /* Route: /user */
      if (route.match(ROUTE_USER)) {}

      /* Route: /content */
      if (route.match(ROUTE_CONTENT)) {}

      break;
  }

  /* No matching route found */
  return null;
}
