"use strict";

import { createStore } from 'redux';
import express         from 'express';
import http            from 'http';
import nunjucks        from 'nunjucks';
import riot            from 'riot';

var api       = require(__ROOT + 'core/server/api'); // ToDo: Actually use api.
var backend   = require(__ROOT + 'themes/backend/borealis/components/index.tag');
var config    = require(__ROOT + 'config');
var frontend  = require(__ROOT + 'themes/frontend/australis/components/index.tag');
var reducers  = require(__ROOT + 'core/shared/reducers');
var routes    = require(__ROOT + 'core/shared/routes');

export default function() {
  var app = express();

  nunjucks.configure(__ROOT + 'core/server/views', {
    autoescape: false,
    express: app
  });

  app.set('view engine', 'tmpl');
  app.use(express.static('public'));

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
    var html = riot.render((!req.state.user ? frontend : backend), {isClient: false, routes: routes, store: store, state: store.getState()});

    res.render('base', {
      html: html,
      initialState: req.state
    });
  });

  http.createServer(app).listen(config.ports.http);
  console.log('http server started on port ' + config.ports.http);
}
