"use strict";

export default class User {
  constructor(params = {}) {
    this.id = params.id;
  }

  static async login(payload) {
    let id;
    return new User({ id });
  }

  toJSON() {
    return {
      id: parseInt(this.id)
    };
  }
}
