"use strict";

import _ from 'lodash';
import User from './User';
import Collection from './Collection';
import { contents, collections, users } from '../../database/orm/models';

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
    let content = await contents.findOne({
      where, include: [users, collections]
    });

    if (!content) {
      return null;
    }

    this.id          = content.id;
    this.uri         = content.uri;
    this.title       = content.title;
    this.content     = content.content;
    this.layout      = content.layout;
    this.owner       = (new User(content.user)).toJSON();
    this.collections = [];

    content.collections.forEach((data) => {
      this.collections.push((new Collection(data)).toJSON());
    });

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
      owner: this.owner,
      collections: this.collections
    };
  }
}
