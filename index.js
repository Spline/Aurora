"use strict";

global.__ROOT = process.cwd();

var cluster = require('cluster');

function messageHandler(obj) {
  switch (obj.action) {
    case 'HTTP_SERVER_STARTED':
      launchedServer++;
      break;
    default:
      console.log(obj);
      break;
  }
}

if (cluster.isMaster) {
  /* Check if everything is configured as it should be. */
  require(__ROOT + '/core/server/checks').config();

  var launchedServer = 0;

  //Production mode
  //var cpus = require('os').cpus().length;

  //Testing mode
  var cpus = 1;

  /* Environment for the workers */
  var env = {};

  for (let i = 0; i < cpus; i++) {
    /* Tell the first worker to sync the database. */
    env.SYNC_DATABASE = i === 0 ? true : false;
    cluster.fork(env);
  }

  var checkLaunchedServer = setInterval(() => {
    if (launchedServer === cpus) {
      console.log('Launched ' + launchedServer + ' http server instances');
      clearTimeout(checkLaunchedServer);
    }
  }, 1000);

  /* If not all workers work correctly, show error */
  setTimeout(() => {
    if (launchedServer !== cpus) {
      console.log('Error');
    }
  }, 10000);

  Object.keys(cluster.workers).forEach((id) => {
    cluster.workers[id].on('message', messageHandler);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %d died (%s). Restarting...', worker.process.pid, signal || code);
    cluster.fork();
  });

} else {
  /* Im a worker! */
  require('babel/register');
  require(`${__ROOT}/core/server/server.js`)();

}
