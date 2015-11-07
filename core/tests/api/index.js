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
  /*before(function(done) {
    this.timeout(10000);
    require('../../../index');
    done();
  });*/

  describe('GENERAL', function() {
    it('/reserved-uri', function(done) {
      var url = '/content';
      request.get(base_url + url, function(error, res) {
        expect(isJSON(res.body)).to.equal(false);
        done();
      });
    });
  });

  describe('GET', function() {
    describe('/content', function() {
      it('/valid-id', function(done) {
        var url = 'content/1';
        request.get(base_url + url, function(error, res) {
          expect(isJSON(res.body)).to.equal(true);
          done();
        });
      });

      it('/valid-uri', function(done) {
        var url = 'john';
        request.get(base_url + url, function(error, res) {
          expect(isJSON(res.body)).to.equal(true);
          done();
        });
      });

      it('/invalid-id', function(done) {
        var url = 'content/99999';
        request.get(base_url + url, function(error, res) {
          expect(isJSON(res.body)).to.equal(false);
          done();
        });
      });

      it('/invalid-uri', function(done) {
        var url = 'test!';
        request.get(base_url + url, function(error, res) {
          expect(isJSON(res.body)).to.equal(false);
          done();
        });
      });
    });
  });
});
