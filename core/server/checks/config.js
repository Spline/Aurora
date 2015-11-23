"use strict";

var colors = require('colors');
var fs = require('fs');

var config;
var exists = () => {
  if(fs.existsSync(__ROOT + '/config.js')) {
    config = require(__ROOT + '/config');
    return true;
  }

  process.stdout.write('config.js not found'.red);
  return false;
};

var themes = () => {
  if(!config.theme || !config.theme.backend) {
    console.log('Missing backend theme');
    return false;
  }

  if(!config.theme || !config.theme.frontend) {
    console.log('Missing frontend theme');
    return false;
  }

  return true;
};

module.exports = () => {
  process.stdout.write('Config file... '.cyan);

  if(exists() &&
     themes()
  )
    process.stdout.write('Ok'.green + '\n');
  else {
    console.log('\n');
    process.exit();
  }
};
