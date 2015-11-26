"use strict";

import _ from 'lodash';
import ROUTE from './routes';

var Collection = require(`${__ROOT}/core/server/api/models/Collection`);
var Content    = require(`${__ROOT}/core/server/api/models/Content`);
var User       = require(`${__ROOT}/core/server/api/models/User`);
var Session    = require(`${__ROOT}/core/server/api/models/Session`);

var InvalidParameterException = require(`${__ROOT}/core/server/exceptions/Invalid-Parameter`);
var InvalidOrCorruptAuthenticityException = require(`${__ROOT}/core/server/exceptions/Invalid-Or-Corrupt-Authenticity`);

let parseParameter = (param, check) => {
  if(check(param)) {
    return param;
  } else {
    /* Parameter format incorrect */
    throw new InvalidParameterException();
  }
};

export default async function(route, params = { method: 'GET' }) {
  let queryParams = null, returnValue = null,
    cookies = params.cookies;

  if(route === '/')
    route = '/collection/1';

  switch (params.method.toUpperCase()) {
    case 'GET':

      if (route.match(ROUTE.LOGIN)) {
        return { interface: 'backend', layout: 'login' };
      }

      if (route.match(ROUTE.BACKEND)) {
        if(await Session.isValid(parseInt(cookies.get('userId')), cookies.get('secret'))) {
          if(route.match(ROUTE.BACKEND_DASHBOARD)) {
            return { interface: 'backend', layout: 'dashboard' };
          }

        } else {
          throw new InvalidOrCorruptAuthenticityException();
          
        }

        return null;
      }

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
        if(params.payload) {
          let target = await User.login(params.payload);
          cookies.set('userId', target.user.id);
          cookies.set('secret', target.secret);

          if(target.user) {
            returnValue = target.user.toJSON();
            returnValue.redirect = '/admin/dashboard';

          } else {
            returnValue = null;
          }
        }
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
