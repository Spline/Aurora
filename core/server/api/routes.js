"use strict";

let REGEX = require(__ROOT + 'shared/regex');

const LOGIN = new RegExp(`/login`);

const USER = new RegExp(`/user`);
const USER_ID = new RegExp(`/user/${REGEX.ID}`);

const CONTENT = new RegExp(`/content`);
const CONTENT_ID = new RegExp(`/content/${REGEX.ID}`);
const CONTENT_URI = new RegExp(`/content/${REGEX.URI}`);

export default { LOGIN, USER, USER_ID, CONTENT, CONTENT_ID }
