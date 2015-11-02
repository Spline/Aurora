"use strict";

import Exception from '../../shared/exceptions';

let params = {
  title: 'Database Connection Exception',
  description: 'Could not establish a connection to the database. Please check your credentials.',
  forceExit: true
}

export default class DatabaseConnectionException extends Exception {
  constructor() {
    super(params);
  }
}
