"use strict";

import sequelize from './connector';

let contents = require('./models/contents')(sequelize);
let users    = require('./models/users')(sequelize);
let sessions = require('./models/sessions')(sequelize);

export default { contents, users, sessions };
