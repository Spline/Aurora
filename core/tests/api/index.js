"use strict";

var request = require('request');
var expect = require('chai').expect;

var base_url = 'http://localhost:1337/'

function isJSON(string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}

describe('API', function() {
  this.slow(500);
  describe('GET', function() {
    describe('/content', function() {
      it('/id  (valid)', function(done) {
        request.get(base_url + 'content/1', function(error, res) {
          expect(isJSON(res.body)).to.equal(true);
          done();
        });
      });

      it('/id  (invalid)', function(done) {
        request.get(base_url + 'content/99999', function(error, res) {
          expect(isJSON(res.body)).to.equal(false);
          done();
        });
      });

      it('/uri (valid)', function(done) {
        request.get(base_url + 'john', function(error, res) {
          expect(isJSON(res.body)).to.equal(true);
          done();
        });
      });

      it('/uri (invalid)', function(done) {
        request.get(base_url + 'test!', function(error, res) {
          expect(isJSON(res.body)).to.equal(false);
          done();
        });
      });
    });
  });
});
