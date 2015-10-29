"use strict";

export default class Exception {
  constructor(params = {}) {
    console.log(`${params.title} exception is thrown. ${params.description}`);
  }
}
