"use strict";

import api             from './api'; // ToDo: Actually use api.
import { createStore } from 'redux';
import config          from '../config';
import express         from 'express';
import http            from 'http';
import nunjucks        from 'nunjucks';
import riot            from 'riot';
import reducers        from '../shared/reducers';
import routes          from '../shared/routes';

import backend  from '../shared/components/backend.tag';
import frontend from '../shared/components/frontend.tag';

export default function() {
  var app = express();

  nunjucks.configure('server/views', {
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
