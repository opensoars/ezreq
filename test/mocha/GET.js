const assert = require('assert');
const http = require('http');

const port = 3953;
const hostName = 'localhost';
const localUrl = `http://${hostName}:${port}`;
const localOptions = {
  hostname: 'localhost',
  port: port,
  method: 'GET'
};

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('GET', () => {

  let instance;
  before((done) => {
    instance = http.createServer((req, res) => res.end('ok')).listen(port);
    instance.on('listening', () => done())
  })

  after((done) => {
    instance.close();
    done();
  });

  const GET = REQ('src/GET');
  describe('#require', () => {
    it('returns a function', () => assert.equal(typeof GET, 'function'));
  });

  describe('#error logger @ catch', () => {
    it('logs the error', (done) => {
      GET('asd://asd').then(() => {}).catch(() => done());
    });
  });

  describe('#no (or wrong) arguments', () => {
    it('throws when no arguments are given', () => assert.throws(() => GET()));
    it('throws when arguments are given but of the wrong type', () => {
      assert.throws(() => GET([], [], 123));
      assert.throws(() => GET(123, 'zzz', 123));
      assert.throws(() => GET(null, null));
    })
  });

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
      assert.doesNotThrow(() => GET(localOptions, (err, res) => done()));
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
    it('takes an url string', (done) => {
      GET(localUrl)
        .then(() => done())
        .catch((err) => {});
    });
    it('takes an request options object', (done) => {
      GET(localOptions)
        .then(() => done())
        .catch((err) => {});
    });
  });

});
