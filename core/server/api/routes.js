"use strict";

let REGEX = require(__ROOT + '/core/shared/regex');

const LOGIN = new RegExp(`^/login$`);

const USER = new RegExp(`^/user$`);
const USER_ID = new RegExp(`^/user/${REGEX.ID}$`);

const CONTENT = new RegExp(`^/content$`);
const CONTENT_ID = new RegExp(`^/content/${REGEX.ID}$`);

const COLLECTION_ID = new RegExp(`^/collection/${REGEX.ID}$`);

const URI = new RegExp(`^/${REGEX.URI}$`);

const RESERVED_WORDS = new RegExp(`^/(content|admin)$`);

export default {
  LOGIN, USER, USER_ID, CONTENT, CONTENT_ID, COLLECTION_ID, URI, RESERVED_WORDS
};
