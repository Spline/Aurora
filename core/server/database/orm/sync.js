"use strict";

import models from './models';

/* Create tables... */
let options = { force: true };

models.contents.sync(options).then(function() {
  models.contents.create({ uri: 'john', title: 'John', content: 'Hancock', author_id: 1 });
  models.contents.create({ uri: 'michael', title: 'Michael', content: 'Berger', author_id: 1 });
  models.contents.create({ uri: 'jens', title: 'Jens', content: 'Schmidt', author_id: 1 });
});

models.users.sync(options);
