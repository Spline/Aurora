"use strict";

import sequelize from './connector';

let contents = require('./models/contents')(sequelize);
let users = require('./models/users')(sequelize);

export default { contents, users };
