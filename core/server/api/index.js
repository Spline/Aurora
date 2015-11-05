"use strict";

import _ from 'lodash';
import ROUTE from './routes';

let Content = require(__ROOT + 'core/server/api/models/Content');
let User    = require(__ROOT + 'core/server/api/models/User');

let InvalidParameterException = require(__ROOT + 'core/server/exceptions/Invalid-Parameter');

let parseParameter = (param, check) => {
  if(check(param)) {
    return param;
  } else {
    /* Parameter format incorrect */
    throw new InvalidParameterException();
  }
};

export default async function(route, params = { method: 'GET' }) {
  let queryParams;

  switch (params.method.toUpperCase()) {
    case 'GET':
      /* Route: /user/:id */
      if (queryParams = route.match(ROUTE.USER_ID)) {
        let userId = parseParameter(parseInt(queryParams[1]), _.isNumber);
        let user = await (new User({ id: contentId })).fetch();
        return user.toJSON();
      }

      /* Route: /content/:id */
      if (queryParams = route.match(ROUTE.CONTENT_ID)) {
        let contentId = parseParameter(parseInt(queryParams[1]), _.isNumber);
        let content = await (new Content({ id: contentId })).fetch();
        return content.toJSON();
      }

      /* Route: /:this-is-an-uri */
      if (queryParams = route.match(ROUTE.URI)) {
        let contentUri = parseParameter(queryParams[1].toString(), _.isString);
        let content = await (new Content({ uri: contentUri })).fetch();
        return content.toJSON();
      }

      break;

    case 'POST':
      /* Route: /login */
      if (route.match(ROUTE.LOGIN)) {
        return (await User.login(params.payload)).toJSON();
      }

      /* Route: /user */
      if (route.match(ROUTE.USER)) {}

      /* Route: /content */
      if (route.match(ROUTE.CONTENT)) {}

      break;
  }

  /* No matching route found */
  return null;
}
