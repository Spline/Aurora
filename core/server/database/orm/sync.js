"use strict";

import colors from 'colors';
import { contents, users, sessions } from './models';

/* Create tables... */
let options = { force: true, logging: false };

export default function() {
  return new Promise((resolve, reject) => {
    process.stdout.write('Creating database tables... '.cyan);
    Promise.all([
      contents.sync(options),
      users.sync(options),
      sessions.sync(options)

    ]).then(() => {
      console.log('DONE'.green);
      process.stdout.write('Creating database contents... '.cyan);

      Promise.all([
        /* Add some content data to the database. */
        contents.create({ uri: 'john', title: 'John', content: 'Hancock', author_id: 1 }),
        contents.create({ uri: 'michael', title: 'Michael', content: 'Berger', author_id: 1 }),
        contents.create({ uri: 'jens', title: 'Jens', content: 'Schmidt', author_id: 1 }),

        /* Add some user data to the database. */
        users.create({ firstName: 'Eric', name: 'Range', email: 'eric.range@live.de', hash: '$2a$08$I9SGIZrgTJy.MW4ZrooV9eWLxdomHzkDW3OanGwJwpxQKEofgxpTi' }),
        users.create({ firstName: 'Pablo', name: 'Sichert', email: 'mail@pablosichert.de', hash: '$2a$08$I9SGIZrgTJy.MW4ZrooV9eWLxdomHzkDW3OanGwJwpxQKEofgxpTi' }),

      ]).then(() => {
        console.log('DONE'.green);
        resolve();

      });

    }).catch((err) => {
      reject(err);

    });
  });
}
