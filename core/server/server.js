"use strict";

import { createStore } from 'redux';
import http            from 'http';
import Koa             from 'koa';
import nunjucks        from 'nunjucks';
import riot            from 'riot';
import serve           from 'koa-static';

var config   = require(__ROOT + 'config');

var api      = require(__ROOT + 'core/server/api'); // ToDo: Actually use api.
var backend  = require(__ROOT + 'themes/backend/' + config.theme.backend + '/components/index.tag');
var frontend = require(__ROOT + 'themes/frontend/' + config.theme.frontend + '/components/index.tag');
var reducers = require(__ROOT + 'core/shared/reducers');
var routes   = require(__ROOT + 'core/shared/routes');
var Database = require(__ROOT + 'core/server/database');

export default async function() {

  /* Bootstrap */
  try {
    await Database.connect();
    await Database.sync();

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
