"use strict";

import User from './User';

import { contents, users } from '../../database/orm/models';

export default class Content {
  constructor(params = {}) {
    /* If there is no id specified, this must be new content. */
    this.id = params.id;
    if (this.id) {
      /* Fetch data from database. */
    } else {
      this.title = params.title;
      this.content = params.content;
    }
  }

  async fetch() {
    let result = await contents.findOne({ where: { id: this.id }, include: [users] });
    this.title = result.title;
    this.content = result.content;
    this.author = (new User(result.user.dataValues)).toJSON();
    return this;
  }

  toJSON() {
    return {
      id: parseInt(this.id),
      title: this.title,
      content: this.content,
      author: this.author
    };
  }
}
