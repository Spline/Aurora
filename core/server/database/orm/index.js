"use strict";

let config = require(__ROOT + 'config');

import Sequelize from 'sequelize';

let sequelize = new Sequelize(config.database.name, config.database.user, config.database.pass, {
  host: config.database.host,
  dialect: 'mysql'
});

/* Create tables... */
let options = { force: true };
require('./models/contents')(sequelize).sync(options);
require('./models/users')(sequelize).sync(options);
