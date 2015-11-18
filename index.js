"use strict";

global.__ROOT = process.cwd();

require('babel/register');
require(__ROOT + '/core/server/server.js')();
