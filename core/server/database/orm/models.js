"use strict";

import sequelize from './connector';

let contents = require('./models/contents')(sequelize);
let users    = require('./models/users')(sequelize);
let sessions = require('./models/sessions')(sequelize);

users.hasMany(contents, { constraints: false, foreignKey: 'author_id' });
contents.belongsTo(users, { constraints: false, foreignKey: 'author_id' });

export default { contents, users, sessions };
