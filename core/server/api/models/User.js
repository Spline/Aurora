"use strict";

import bcrypt from 'bcrypt';

import Session from './Session';
import InvalidLoginCredentialsException from '../../exceptions/Invalid-Login-Credentials';
import { users } from '../../database/orm/models';

let computeHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, function(err, hash) {
      if (err) {
        reject(err);
      }
      else {
        resolve(hash);
      }
    });
  });
};

let computeAndCompareHash = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, success) => {
      if (!err && success) {
        resolve(true);
      }
      else {
        reject(new InvalidLoginCredentialsException());
      }
    });
  });
};

export default class User {
  constructor(params = {}) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.name = params.name;
    this.email = params.email;
  }

  static async login(payload = {}) {
    let userData = await users.findOne({ where: { email: payload.email } });
    try {
      if (userData && await computeAndCompareHash(payload.password, userData.hash)) {
        let user = await (new User({ id: userData.id })).fetch();
        await new Session(user).create();
        return user;
      }
    } catch (ex) {
      return ex;
    }
    return null;
  }

  async fetch() {
    let user = await users.findOne({ where: { id: this.id } });
    this.id = user.id;
    this.firstName = user.firstName;
    this.name = user.name;
    this.email = user.email;
    return this;
  }

  toJSON() {
    return {
      id: parseInt(this.id),
      firstName: this.firstName,
      name: this.name,
      fullName: `${this.firstName} ${this.name}`,
      email: this.email,
      image: ''
    };
  }
}
