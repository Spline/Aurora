"use strict";

import Sequelize from 'sequelize';

let config = require(__ROOT + 'config');

export default new Sequelize(config.database.name, config.database.user, config.database.pass, {
  host: config.database.host,
  dialect: 'mysql',
  logging: false
});
