"use strict";

let createSessionString = () => {
  return Math.random().toString();
}

export default class Session {
  constructor(user) {
    this.userId = user.id;
  }

  async create() {
    let sessionString = createSessionString();
    return this;
  }

  async isValid() {
    return true;
  }

  toJSON() {
    return {

    };
  }
}
