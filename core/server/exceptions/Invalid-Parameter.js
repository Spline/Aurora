"use strict";

import Exception from '../../shared/exceptions';

let params = {
  title: 'Invalid Parameter Exception',
  description: 'Invalid Parameter Exception',
  forceExit: true
};

export default class InvalidParameterException extends Exception {
  constructor() {
    super(params);
  }
}
