"use strict";

import _ from 'lodash';
import crypto from 'crypto';

import { sessions } from '../../database/orm/models';

let createSecret = () => {
  let shasum = crypto.createHash('sha256');
  let IV = (function(length) {
    let temp = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.:,;#*';
    for(let i = 0; i < length; i++)
        temp += chars.charAt(Math.floor(Math.random() * chars.length));
    return temp;
  })(32);
  shasum.update(IV);
  return shasum.digest('hex');
}

export default class Session {
  constructor(user) {
    this.userId = user.id;
  }

  async create() {
    this.secret = createSecret();
    await sessions.upsert({
      userId: parseInt(this.userId),
      secret: this.secret
    });
    return this;
  }

  static async isValid(userId, secret) {
    if(!_.isNumber(userId)) {
      return false;
    }

    let sessionData = await sessions.findOne({
      where: {
        userId: userId,
        secret: secret
      }
    });
    return sessionData ? true : false;
  }

  toJSON() {
    return {
      secret: this.secret
    };
  }
}
