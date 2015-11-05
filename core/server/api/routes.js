"use strict";

const REGEX_NUMBER = '([0-9]{1,8})';

const LOGIN = new RegExp(`/login`);

const USER = new RegExp(`/user`);
const USER_ID = new RegExp(`/user/${REGEX_NUMBER}`);

const CONTENT = new RegExp(`/content`);
const CONTENT_ID = new RegExp(`/content/${REGEX_NUMBER}`);

export default { LOGIN, USER, USER_ID, CONTENT, CONTENT_ID }
