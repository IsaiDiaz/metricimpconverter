const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'initNum', 'Response should have initNum property');
        assert.property(res.body, 'initUnit', 'Response should have initUnit property');
        assert.property(res.body, 'returnNum', 'Response should have returnNum property');
        assert.property(res.body, 'returnUnit', 'Response should have returnUnit property');
        assert.property(res.body, 'string', 'Response should have string property');
        done();
      });
  });

  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'error', 'Response should have error property');
        assert.equal(res.body.error, 'Invalid unit', 'Error message should be "Invalid unit"');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'error', 'Response should have error property');
        assert.equal(res.body.error, 'Invalid number', 'Error message should be "Invalid number"');
        done();
      });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'error', 'Response should have error property');
        assert.equal(res.body.error, 'Invalid number and unit', 'Error message should be "Invalid number and unit"');
        done();
      });
  });

  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai
      .request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body, 'Response should be an object');
        assert.property(res.body, 'initNum', 'Response should have initNum property');
        assert.property(res.body, 'initUnit', 'Response should have initUnit property');
        assert.property(res.body, 'returnNum', 'Response should have returnNum property');
        assert.property(res.body, 'returnUnit', 'Response should have returnUnit property');
        assert.property(res.body, 'string', 'Response should have string property');
        done();
      });
  });

});
