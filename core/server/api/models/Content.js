"use strict";

import User from './User';
import { contents, users } from '../../database/orm/models';

export default class Content {
  constructor(params = {}) {
    /* If there is no id or uri specified, this must be new content. */
    this.id = params.id;
    this.uri = params.uri;

    if (!this.id && !this.uri) {
      this.title = params.title;
      this.content = params.content;
    }
  }

  async fetch() {
    let where = this.id ? { id: this.id } : { uri: this.uri };
    let result = await contents.findOne({
      where, include: [users]
    });

    if (!result) {
      return null;
    }

    this.id = result.id;
    this.uri = result.uri;
    this.title = result.title;
    this.content = result.content;
    this.layout = result.layout;
    this.author = (new User(result.user.dataValues)).toJSON();

    return this;
  }

  async save() {
    return this;
  }

  toJSON() {
    return {
      id: parseInt(this.id),
      uri: this.uri,
      title: this.title,
      content: this.content,
      layout: this.layout,
      author: this.author
    };
  }
}
