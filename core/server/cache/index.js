"use strict";

/*

let cache = await new Cache("/blog").find();
result = cache ? cache : buildSite...;

buildSite() {
 let html = render...;
 cache.build(html);
}

*/

import redis from "redis";
let client = redis.createClient();

let processQuery = async() => {
  let that = this;
  new Promise(function(resolve, reject) {
    client.get(that.cacheKey, function(err, reply) {
      if (err) reject(err);
      else resolve(reply);
    });
  });
}

export default class Cache {
  constructor(uri, params = {}) {
    this.cacheKey = uri;
  }

  async find() {
    let result = await processQuery();
    return result;
  }

  async build() {
    /* Cache optimizer */
  }
}
