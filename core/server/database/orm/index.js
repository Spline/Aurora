"use strict";

let config = require(__ROOT + 'config');

import Sequelize from 'sequelize';
import SQL from '../';

let sequelize = new Sequelize(config.database.name, config.database.user, config.database.pass, {
  host: config.database.host,
  dialect: 'mysql'
});

/* Create tables... */
let options = { force: true };
let contents = require('./models/contents')(sequelize);
contents.sync(options).then(function() {
  contents.create({ uri: 'john', title: 'John', content: 'Hancock', author_id: 1 });
  contents.create({ uri: 'michael', title: 'Michael', content: 'Berger', author_id: 1 });
  contents.create({ uri: 'jens', title: 'Jens', content: 'Schmidt', author_id: 1 });
});

let users = require('./models/users')(sequelize).sync(options);
