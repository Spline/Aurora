"use strict";

import _ from 'lodash';

export default class Collection {
  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name
    };
  }
}
