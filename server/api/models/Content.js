"use strict";

export default class Content {
  constructor(params = {}) {
    /* If there is no id specified, this must be new content. */
    this.id = params.id;
    if (this.id) 
      /* Fetch data from database. */
    } else {
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
