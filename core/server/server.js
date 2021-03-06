// TODO: static file serving when developing

"use strict";

import { createStore } from 'redux';
import convert         from 'koa-convert';
import http            from 'http';
import Koa             from 'koa';
import nunjucks        from 'nunjucks';
import riot            from 'riot';
import serve           from 'koa-static';

var check = require(__ROOT + 'core/server/checks');

export default async function() {

  /* Check if everything is configured as it should be. */
  await check.config();

  var config   = require(__ROOT + 'config');
  var api      = require(__ROOT + 'core/server/api');
  var reducers = require(__ROOT + 'core/shared/reducers');
  var routes   = require(__ROOT + 'core/shared/routes');
  var database = require(__ROOT + 'core/server/database');

  // Require components that depend on riot being included
  var backend  = require(__ROOT + `themes/backend/${config.theme.backend}/components/index.tag`);
  var frontend = require(__ROOT + `themes/frontend/${config.theme.frontend}/components/index.tag`);

  /* Bootstrap */
  try {
    await database.connect();
    await database.sync();

  } catch(ex) {
    console.log(ex);

  }

  try {
    var app = new Koa();
    app.experimental = true;

    nunjucks.configure(__ROOT + 'core/server/views', {
      autoescape: false
    });

    app.use(convert(serve(__ROOT + 'public'))); // TODO: replace with native async function

    app.use(async function(context, nextMiddleware) {
      // Init the state object
      context.state = {
        url: context.req.url,
        content: {},
        user: null
      };

      return await nextMiddleware();
    });

    app.use(async function(context, nextMiddleware) {
      context.state.content = await api(context.req.url);

      return await nextMiddleware();
    });

    app.use(async function(context) {
      var store = createStore(reducers, context.state);
      var html = riot.render((!context.state.user ? frontend : backend), {
        isClient: false,
        routes: routes,
        store: store,
        state: store.getState()
      });

      var body = nunjucks.render('base.tmpl', {
        html: html,
        initialState: context.state
      });

      context.body = body;
    });
  } catch(exception) {
    console.log(exception);

  }

  http.createServer(app.callback()).listen(config.ports.http);
  console.log('http server started on port ' + config.ports.http);
}
