"use strict";

import InvalidCredentialsException from "../exceptions/InvalidCredentials";

export default class User {
  constructor(params = {}) {
    this.id = params.id;
  }

  static async login(payload) {
    let id;
    
    //throw new InvalidCredentialsException();
    return new User({ id });
  }

  toJSON() {
    return {
      id: parseInt(this.id)
    };
  }
}
