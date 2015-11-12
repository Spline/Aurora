"use strict";

import _ from 'lodash';

import { contents, collections, users } from '../../database/orm/models';

import Content from './Content';
import User from './User';

export default class Collection {
  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.layout = params.layout;
  }

  async fetch() {
    let where = this.id ? { id: this.id } : { uri: this.uri };
    let collection = await collections.findOne({
      where, include: [contents]
    });

    if (!collection) {
      return null;
    }

    this.id = collection.id;
    this.name = collection.name;
    this.layout = collection.layout;
    this.contents = [];

    collection.contents.forEach((data) => {
      this.contents.push((new Content(data)).toJSON());
    });

    return this;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      layout: this.layout,
      contents: this.contents
    };
  }
}
