"use strict";

import _ from 'lodash';
import ROUTE from './routes';

let Collection = require(`${__ROOT}/core/server/api/models/Collection`);
let Content = require(`${__ROOT}/core/server/api/models/Content`);
let User    = require(`${__ROOT}/core/server/api/models/User`);

let InvalidParameterException = require(`${__ROOT}/core/server/exceptions/Invalid-Parameter`);

let parseParameter = (param, check) => {
  if(check(param)) {
    return param;
  } else {
    /* Parameter format incorrect */
    throw new InvalidParameterException();
  }
};

let parseSession = (session) => {
  return {
    userId: '',
    secret: ''
  };
};

export default async function(route, params = { method: 'GET' }) {
  let queryParams = null, returnValue = null, session = parseSession(params.session);

  if(route === '/')
    route = '/collection/1';

  switch (params.method.toUpperCase()) {
    case 'GET':
      /* Route: /user/:id */
      if (queryParams = route.match(ROUTE.USER_ID)) {
        let userId = parseParameter(parseInt(queryParams[1]), _.isNumber);
        let user = await (new User({ id: contentId })).fetch();
        returnValue = user ? user.toJSON() : null;
      }

      /* Route: /content/:id */
      if (queryParams = route.match(ROUTE.CONTENT_ID)) {
        let contentId = parseParameter(parseInt(queryParams[1]), _.isNumber);
        let content = await (new Content({ id: contentId })).fetch();
        returnValue = content ? content.toJSON() : null;
      }

      /* Route: /collection/:id */
      if (queryParams = route.match(ROUTE.COLLECTION_ID)) {
        let collectionId = parseParameter(parseInt(queryParams[1]), _.isNumber);
        let collection = await (new Collection({ id: collectionId })).fetch();
        returnValue = collection ? collection.toJSON() : null;
      }

      /* Route: /:this-is-an-uri */
      if (queryParams = route.match(ROUTE.URI)) {
        if(ROUTE.RESERVED_WORDS.test(route)) {
          return null;
        }

        let contentUri = parseParameter(queryParams[1].toString(), _.isString);
        let content = await (new Content({ uri: contentUri })).fetch();
        returnValue = content ? content.toJSON() : null;
      }

      break;

    case 'POST':
      /* Route: /login */
      if (route.match(ROUTE.LOGIN)) {
        returnValue = (await User.login(params.payload)).toJSON();
      }

      /* Route: /user */
      /* if (route.match(ROUTE.USER)) {} */

      /* Route: /content */
      /* if (route.match(ROUTE.CONTENT)) {} */

      break;

    default:
      return null;
  }

  return returnValue;
}
