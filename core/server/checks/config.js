"use strict";

import colors from 'colors';
import fs from 'fs';

let config;
let exists = async () => {
  if(fs.existsSync(__ROOT + 'config.js')) {
    config = require(__ROOT + 'config');
  }
};

let themes = async () => {
  if(!config.theme || !config.theme.backend) {
    console.log('Missing backend theme');
  }

  if(!config.theme || !config.theme.frontend) {
    console.log('Missing frontend theme');
  }
};

export default async function() {
  process.stdout.write('Config file... '.cyan);

  exists();
  themes();

  process.stdout.write('OK'.green + '\n');
};
