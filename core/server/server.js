// TODO: static file serving when developing

"use strict";

import { createStore } from 'redux';
import http            from 'http';
import Koa             from 'koa';
import nunjucks        from 'nunjucks';
import riot            from 'riot';
import serve           from 'koa-static-server';
import bodyParser      from 'koa-bodyparser';
import convert         from 'koa-convert';

var check = require(`${__ROOT}/core/server/checks`);

export default async function() {
  /* Check if everything is configured as it should be. */
  await check.config();

  try {
    var config   = require(`${__ROOT}/config`);
    var api      = require(`${__ROOT}/core/server/api`);
    var reducers = require(`${__ROOT}/core/shared/reducers`);
    var routes   = require(`${__ROOT}/core/shared/routes`);
    var database = require(`${__ROOT}/core/server/database`);

  } catch(ex) { console.log(ex); }

  var frontendThemePath = `${__ROOT}/themes/frontend/${config.theme.frontend}`;
  var frontendTemplates = [];

  // Require components that depend on riot being included
  var backend;
  var frontend;

  /* Bootstrap */
  try {
    await database.connect();
    await database.sync();

    /* Load all templates */
    require("fs").readdirSync(`${frontendThemePath}/templates`).forEach(function(file) {
      frontendTemplates[file.substring(0, file.length - 4)] = require(`${frontendThemePath}/templates/${file}`);
    });

  } catch(ex) {
    console.log(ex);

  }

  try {
    var app = new Koa();
    app.experimental = true;

    nunjucks.configure(frontendThemePath, {
      autoescape: false
    });

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
      ctx.body = ctx.request.body;
      ctx.state.content = await api(ctx.req.url, {
        session: ctx.cookies.get('session'),
        payload: ctx.body,
        method: ctx.req.method
      });
      return await next();
    });

    app.use(async (ctx) => {
      let startTime = new Date();
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

        console.log(`Render processing time: ${new Date() - startTime}ms`);
        ctx.body = body;

      }
    });
  } catch(exception) {
    console.log(exception);

  }

  http.createServer(app.callback()).listen(config.ports.http);
  console.log('http server started on port ' + config.ports.http);
}
