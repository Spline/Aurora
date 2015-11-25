"use strict";

import crypto from 'crypto';

import { sessions } from '../../database/orm/models';

let createSessionString = (userId) => {
  let shasum = crypto.createHash('sha256');
  let IV = (function(length) {
    let temp = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.:,;#*';
    for(let i = 0; i < length; i++)
        temp += chars.charAt(Math.floor(Math.random() * chars.length));
    return temp;
  })(32);
  shasum.update(`${IV}-${userId}`);
  return shasum.digest('hex');
}

export default class Session {
  constructor(user) {
    this.userId = user.id;
  }

  async create() {
    this.sessionString = createSessionString(this.userId);
    await sessions.upsert({
      userId: this.userId,
      sessionString: this.sessionString
    });
    return this;
  }

  async isValid() {
    let sessionData = await sessions.findOne({ where: { userId: this.userId } });
    return sessionData ? true : false;
  }

  toJSON() {
    return {
      sessionString: this.sessionString
    };
  }
}
