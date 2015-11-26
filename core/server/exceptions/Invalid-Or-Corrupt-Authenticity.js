"use strict";

import Exception from '../../shared/exceptions';

let params = {
  title: 'Invalid Or Corrupt Authenticity Exception',
  description: 'Invalid Or Corrupt Authenticity Exception'
};

export default class InvalidOrCorruptAuthenticityException extends Exception {
  constructor() {
    super(params);
  }
}
