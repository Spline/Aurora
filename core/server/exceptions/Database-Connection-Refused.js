"use strict";

import Exception from '../../shared/exceptions';

let params = {
  title: 'Database Connection Refused Exception',
  description: 'Could not establish a connection to the database. Please check your credentials.',
  forceExit: true
};

export default class DatabaseConnectionRefusedException extends Exception {
  constructor(message) {
    super({
      ...params,
      info: message ? message : null
    });
  }
}
