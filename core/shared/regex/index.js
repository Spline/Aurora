"use strict";

const PATTERN = {
  ID:    '([\\d]{1,8})',
  EMAIL: '^([\\w-]+(?:\.[\\w-]+)*)@((?:[\\w-]+\.)*\\w[\\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$',
  URI:   '([\\\w\\d\-]{1,255})',

  GET_PARAMS: '(\\&|\\?)(.*?)\\=(.*?)'
};

export default PATTERN;
