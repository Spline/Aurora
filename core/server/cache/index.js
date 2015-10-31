"use strict";

import redis from 'redis';
let client = redis.createClient();

client.on('connect', () => {
  console.log('Connected to Cache');
});

client.on('error', (err) => {
  console.log('cache error: ' + err);
});

let getCache = async(cacheKey) => {
  return new Promise((resolve, reject) => {
    client.get(cacheKey, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

let setCache = async(cacheKey, value) => {
  return new Promise((resolve, reject) => {
    client.set(cacheKey, value, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export default class Cache {
  constructor(uri, params = { object: 'site' }) {
    this.cacheKey = `${params.object}:${uri}`;
  }

  async get() {
    let result = await getCache(this.cacheKey);
    return result;
  }

  async set(value) {
    /* implement cache optimizer... */
    let result = await setCache(this.cacheKey, value);
    return result;
  }
}
