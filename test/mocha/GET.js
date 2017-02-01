/**
 * I dont need to actualy use async await in my tests
 * since it works as long as promises work correctly, which
 * will of course be tested.
 * 
 * Also keep "eztest" in mind <3
 */

const assert = require('assert');

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('GET', () => {
  const GET = REQ('src/GET');
  describe('#require', () => {
    it('returns a function', () => assert.equal(typeof GET, 'function'));
  });


  describe('#callback functionality', () => {
    it('takes a urlString and callbackFunction as arguments', () => {
      assert.doesNotThrow(() => {
        GET('http://github.com/opensoars', (res) => {});
      })
    });
/*    it('returns an object conaining `on` so event handlers can be bound', () => {
      assert.equal(
        typeof GET('http://github.com/opensoars', (res) => {}).on,
        'function'
      );
    });*/
    it('calls the callback with an error object when an error occurs', (done) => {
      GET('httpasd://zzzz', (err, res) => {
        assert.equal(typeof err, 'object');
        assert.equal(typeof err.message, 'string');
        done();
      })
    });

  });


});
