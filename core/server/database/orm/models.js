"use strict";

import connector from './connector';
import Sequelize from 'sequelize';

let contents             = require('./models/contents')(connector);
let collections          = require('./models/collections')(connector);
let contents_collections = require('./models/contents-collections')(connector);
let users                = require('./models/users')(connector);
let sessions             = require('./models/sessions')(connector);

users.hasMany(contents, { constraints: false, foreignKey: 'ownerId' });
contents.belongsTo(users, { constraints: false, foreignKey: 'ownerId' });

contents.belongsToMany(collections, { constraints: false, through: contents_collections });
collections.belongsToMany(contents, { constraints: false, through: contents_collections });

export default { contents, users, sessions, collections, contents_collections };
