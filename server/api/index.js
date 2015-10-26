"use strict";

import User from './models/user';

const ROUTE_USER = /\/user/;
const ROUTE_USER_ID = /\/user\/([^\/]+)\/?/;

export default async function(route, params = { method: 'GET' }) {
  let queryParams;

  switch (params.method) {
    case 'GET':

      /* Route: /user/<id> */
      if (queryParams = route.match(ROUTE_USER_ID)) {
        return (new User({ id: queryParams[1] })).toJSON();
      }

      break;

    case 'POST':

      /* Route: /user */
      if (route.match(ROUTE_USER)) { }

      break;
  }
};
