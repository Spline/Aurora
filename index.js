"use strict";

require('babel/register');

global.__ROOT = process.cwd() + '/';

require(__ROOT + 'core/server/server.js')();
