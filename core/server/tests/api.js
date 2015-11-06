"use strict";

import should from 'should';
import assert from 'assert';

var api = require(__ROOT + 'core/server/api');

export default async() => {

  describe('API', function() {
    before(function(done) {
      /* ... */
      done();
    });

    describe('Invalid urls', function() {
      it('should return null', function(done) {
        (await api('/!invalid')).should.equal(null);
      });
    });

    describe('Content', function() {
      it('should return json or null', function(done) {
        (await api('/content/-1')).should.equal(null);
        (await api('/content/999')).should.equal(null);
        (await api('/content/1abc')).should.equal(null);
      });
    });
  });

};
