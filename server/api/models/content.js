"use strict";

export default class Content {
  constructor(params = {}) {
    /* If there is no id specified, this must be new content. */
    if (this.id = params.id || null) {
      this.title = params.title;
      this.body  = params.body;
    }
  }

  toJSON() {
    return {
      id:    parseInt(this.id),
      title: this.title,
      body:  this.body
    };
  }
}
