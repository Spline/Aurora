"use strict";

import { createStore } from 'redux';
import http            from 'http';
import Koa             from 'koa';
import nunjucks        from 'nunjucks';
import riot            from 'riot';
import serve           from 'koa-static';

var config, api, backend, frontend, reducers, routes, database;
var check = require(__ROOT + 'core/server/checks');

export default async function() {

  /* Check if everything is configured as it should be. */
  await check.config();

  config   = require(__ROOT + 'config');
  api      = require(__ROOT + 'core/server/api');
  reducers = require(__ROOT + 'core/shared/reducers');
  routes   = require(__ROOT + 'core/shared/routes');
  database = require(__ROOT + 'core/server/database');

  backend  = require(__ROOT + `themes/backend/${config.theme.backend}/components/index.tag`);
  frontend = require(__ROOT + `themes/frontend/${config.theme.frontend}/components/index.tag`);

  /* Bootstrap */
  try {
    await database.connect();
    await database.sync();

  } catch(ex) {
    console.log(ex);

  }

  var app = new Koa();
  app.experimental = true;

  nunjucks.configure(__ROOT + 'core/server/views', {
    autoescape: false
  });

  app.use(serve('public'));

/*
  app.use((req, res, next) => {
    // Default state
    req.state = {
      activeRoute: routes.home,
      user: null
    };
    next();
  });

  for (let route in routes) {
    app.get(routes[route].path, (req, res, next) => {
      req.state.activeRoute = routes[route];
      next();
    });
  }

  app.use((req, res) => {
    var store = createStore(reducers, req.state);
    var html = riot.render((!req.state.user ? frontend : backend), {
      isClient: false,
      routes: routes,
      store: store,
      state: store.getState()
    });

    res.render('base', {
      html: html,
      initialState: req.state
    });
  });
*/

  http.createServer(app.callback()).listen(config.ports.http);
  console.log('http server started on port ' + config.ports.http);
}
