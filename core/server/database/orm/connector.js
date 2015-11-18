"use strict";

import Sequelize from 'sequelize';

let config = require(`${__ROOT}/config`);

export default new Sequelize(
  config.database[config.database.dialect].name,
  config.database[config.database.dialect].user,
  config.database[config.database.dialect].pass, {
    dialect: config.database.dialect,
    host: config.database[config.database.dialect].host,
    port: config.database[config.database.dialect].port,

    /* Sqlite only */
    storage: config.database.sqlite.storage || '',

    logging: false,
    pool: {
      minConnections: 5,
      maxConnections: 50,
      maxIdleTime: 1000
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: true
    },
    language: 'en'
  });
