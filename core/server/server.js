"use strict";

import fs from 'fs';
var requireAll = (path) => {
  let temp = {};
  fs.readdirSync(path)
    .forEach((file) => {
      temp[file.substring(0, file.length - 4)] = require(`${path}/${file}`);
  });
  return temp;
};

import { createStore } from 'redux';
import http            from 'http';
import Koa             from 'koa';
import logger          from 'koa-morgan';
import serve           from 'koa-static-server';
import bodyParser      from 'koa-bodyparser';
import convert         from 'koa-convert';
import nunjucks        from 'nunjucks';
import riot            from 'riot';

export default async function() {
  /* This syntax allow to track errors within the required modules. */
  var config, api, reducers, routes, database;
  try {
    config   = require(`${__ROOT}/config`);
    api      = require(`${__ROOT}/core/server/api`);
    reducers = require(`${__ROOT}/core/shared/reducers`);
    routes   = require(`${__ROOT}/core/shared/routes`);
    database = require(`${__ROOT}/core/server/database`);

  } catch(ex) { console.log(ex); }

  // Require components that depend on riot being included
  var backend, frontend, frontendTemplates;
  var frontendThemePath = `${__ROOT}/themes/frontend/${config.theme.frontend}`;

  nunjucks.configure(frontendThemePath, {
    autoescape: false
  });

  /* Bootstrap */
  try {
    if(process.env['SYNC_DATABASE'] === 'true') {
      await database.connect();
      await database.sync();
    }

    /* Load all templates */
    frontendTemplates = requireAll(`${frontendThemePath}/templates`);

  } catch(ex) {
    console.log(ex);

  }

  try {
    var app = new Koa();
    app.experimental = true;

    /* https://github.com/expressjs/morgan */
    /* combined, common, dev, short, tiny */
    app.use(logger('dev', { skip: (req, res) => {
      return req.url.indexOf('/static/core') !== -1 ? true : false;
    }}));

    app.use(convert(bodyParser()));

    app.use(convert(serve({rootDir: `${__ROOT}/public/core`, rootPath: '/static/core'})));
    app.use(convert(serve({rootDir: `${__ROOT}/public/assets`, rootPath: '/static/assets'})));
    app.use(convert(serve({rootDir: `${frontendThemePath}/public`, rootPath: '/static/theme'})));

    app.use(async (ctx, next) => {
      // Init the state object
      ctx.state = {
        url: ctx.req.url,
        method: ctx.req.method,
        content: {},
        user: null
      };

      return await next();
    });

    app.use(async (ctx, next) => {
      ctx.state.content = await api(ctx.req.url, {
        session: ctx.cookies.get('session'),
        payload: ctx.request.body,
        method:  ctx.req.method
      });
      return await next();
    });

    app.use(async (ctx) => {
      var store = createStore(reducers, ctx.state);
      if(ctx.state.content && ctx.state.content.layout) {
        frontend = frontendTemplates[ctx.state.content.layout];
        var html = riot.render((!ctx.state.user ? frontend : backend), {
          isClient: false,
          routes: routes,
          store: store,
          state: store.getState()
        });

        var body = nunjucks.render(`index.html`, {
          html: html,
          initialState: ctx.state
        });

        ctx.body = body;
      }
    });
  } catch(exception) {
    console.log(exception);

  }

  http.createServer(app.callback()).listen(config.ports.http);
  process.send({ action: 'HTTP_SERVER_STARTED', msg: 'HTTP server started on port ' + config.ports.http });
}
