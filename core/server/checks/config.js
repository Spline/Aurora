"use strict";

import colors from 'colors';
import fs from 'fs';

let config;
let exists = async () => {
  if(fs.existsSync(__ROOT + '/config.js')) {
    config = require(__ROOT + '/config');
    return true;
  }

  process.stdout.write('config.js not found'.red);
  return false;
};

let themes = async () => {
  if(!config.theme || !config.theme.backend) {
    console.log('Missing backend theme');
  }

  if(!config.theme || !config.theme.frontend) {
    console.log('Missing frontend theme');
  }

  return true;
};

export default async function() {
  process.stdout.write('Config file... '.cyan);

  if(await exists() &&
     await themes()
  )
       process.stdout.write('Ok'.green + '\n');
  else {
    console.log('\n');
    process.exit();
  }
};
