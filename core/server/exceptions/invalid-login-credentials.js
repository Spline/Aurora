"use strict";

import Exception from '../../shared/exceptions';

let params = {
  title: 'Invalid Credentials Exception',
  description: 'Invalid Credentials Exception',
  forceExit: true
};

export default class InvalidCredentialsException extends Exception {
  constructor() {
    super(params);
  }
}
