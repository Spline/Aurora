"use strict";

import Exception from '../../shared/exceptions';

let params = {
  title: 'Invalid Login Credentials Exception',
  description: 'Invalid Login Credentials Exception',
  forceExit: true
};

export default class InvalidLoginCredentialsException extends Exception {
  constructor() {
    super(params);
  }
}
