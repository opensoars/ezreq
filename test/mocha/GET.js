const http = require('http');
const port = 3953;
const hostName = 'localhost';
const localUrl = `http://${hostName}:${port}`;
http.createServer((req, res) => {
  res.end('ok');
}).listen(port);


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

  describe('#error logger @ catch', () => {
    it('logs the error', (done) => {
      GET('asd://asd').then(() => {}).catch(() => done());
    });
  });

  describe('#no arguments', () => {
    it('throws when no arguments are given', () => {
      assert.throws(() => {
        GET();
      })
    })
  })

  describe('#callback functionality', () => {
    it('takes a urlString and callbackFunction as arguments', () => {
      assert.doesNotThrow(() => {
        GET(localUrl, (res) => {});
      });
    });
    it('calls the callback with an error object when an error occurs', (done) => {
      GET('httpasd://zzzz', (err, res) => {
        assert.equal(typeof err, 'object');
        assert.equal(typeof err.message, 'string');
        done();
      })
    });
    it('takes an http request options object as 1st argument', (done) => {
      assert.doesNotThrow(() => {
        const options = {
          hostname: 'localhost',
          port: port,
          method: 'GET'
        };

        GET(options, (err, res) => {
          done();
        });
      });
    });
  });

  describe('#promise functionality', () => {
    it('returns a promise when no callback is given', () => {
      assert.equal(typeof GET(localUrl).then, 'function');
      assert.equal(typeof GET(localUrl).then, 'function');
    });
    it('resolves the promise with the request object', (done) => {
      GET(localUrl).then(() => done());
    });
    it('rejects the promise with an error object', (done) => {
      GET('htapoda://asd').then(() => {}).catch((err) => {
        assert.equal(typeof err.message, 'string');
        done();
      });
    });
  });

});
