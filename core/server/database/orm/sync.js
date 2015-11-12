"use strict";

import colors from 'colors';
import { contents, users, sessions, collections, contents_collections } from './models';

/* Create tables... */
let options = { force: true, logging: false };

export default function() {
  return new Promise((resolve, reject) => {
    process.stdout.write('Creating database tables... '.cyan);
    Promise.all([
      contents.sync(options),
      users.sync(options),
      sessions.sync(options),
      collections.sync(options),
      contents_collections.sync(options)

    ]).then(() => {
      console.log('DONE'.green);
      process.stdout.write('Creating database contents... '.cyan);

      Promise.all([
        /* Add some collection data to the database. */
        collections.create({ name: 'Blog', layout: 'blog-posts' }),

        /* Add some content data to the database. */
        contents.create({ uri: 'john', title: 'I have a dream', layout: 'blog-post', content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', ownerId: 1 }),
        contents.create({ uri: 'michael', title: 'Why so serious?', layout: 'blog-post', content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', ownerId: 1 }),
        contents.create({ uri: 'jens', title: 'Big girls dont cry', layout: 'blog-post', content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', ownerId: 1 }),

        /* Add some user data to the database. */
        users.create({ firstName: 'Eric', name: 'Range', email: 'eric.range@live.de', hash: '$2a$08$I9SGIZrgTJy.MW4ZrooV9eWLxdomHzkDW3OanGwJwpxQKEofgxpTi' }),
        users.create({ firstName: 'Pablo', name: 'Sichert', email: 'mail@pablosichert.de', hash: '$2a$08$I9SGIZrgTJy.MW4ZrooV9eWLxdomHzkDW3OanGwJwpxQKEofgxpTi' }),

        contents_collections.create({ collectionId: 1, contentId: 1}),
        contents_collections.create({ collectionId: 1, contentId: 2}),
        contents_collections.create({ collectionId: 1, contentId: 3})

      ]).then(() => {
        console.log('DONE'.green);
        resolve();

      });

    }).catch((err) => {
      reject(err);

    });
  });
}
