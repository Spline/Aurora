"use strict";

import colors from 'colors';

export default class Exception {
  constructor(params) {
    console.log(params.title.toUpperCase().red);
    console.log(params.description.cyan);

    if(params.info) {
      /* If debug */
      console.log(params.info);
    }

    if (params.forceExit) {
      process.exit();
    }
  }
}
