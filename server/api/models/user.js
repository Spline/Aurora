"use strict";

export default class User {
  constructor(params = {}) {
    this.id = params.id || null;
  }

  toJSON() {
    return {
      id: this.id
    };
  }
};
