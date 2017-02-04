const assert = require('assert');
const http = require('http');
const https = require('https');

const port = 3954;
const hostName = 'localhost';
const localUrl = `http://${hostName}:${port}`;
const localOptions = {
  hostname: 'localhost',
  port: port,
  protocol: 'http:'
};

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('DELETE', () => {
  let instance1;
  before((done) => {
    console.log('beeeeeeeeeeeefore');
    instance1 = http.createServer((req, res) => {
      console.log('SERVER YEEEE');
      res.end('ok');
    }).listen(port);
    instance2 = https.createServer((req, res) => {
      console.log('SERVER YEEEE');
      res.end('ok');
    }).listen(port + 1);
    instance2.on('listening', () => done());
  })

  after((done) => {
    console.log('afterrrrrrrrrr');
    instance1.close();
    instance2.close();
    done();
  });
  
  const DELETE = REQ('src/DELETE');
  describe('#require', () => {
    it('returns a function', () => assert.equal(typeof DELETE, 'function'));
  });

  describe('#no (or wrong) arguments', () => {
    it('throws when no arguments are given', () => assert.throws(() => GET()));
    it('throws when arguments are given but of the wrong type', () => {
      assert.throws(() => DELETE([], [], 123));
      assert.throws(() => DELETE(123, 'zzz', 123));
      assert.throws(() => DELETE(null, null));
    })
  });

  describe('#callback functionality', () => {
    it('takes a urlString and callbackFunction as arguments', (done) => {
      assert.doesNotThrow(() => {
        DELETE(`https://localhost:${port + 0}`, (err) => {
          if (err) console.log(err);
          done();
        });
      });
    }).timeout(7000);
/*    it('calls the callback with an error object when an error occurs', (done) => {
      DELETE('httpasd://zzzz', (err, res) => {
        assert.equal(typeof err, 'object');
        assert.equal(typeof err.message, 'string');
        done();
      })
    });
    it('takes an http request options object as 1st argument', (done) => {
      assert.doesNotThrow(() => DELETE('http://www.spele.nl', (err, res) => {
        done();
      }));
    }).timeout(7000);*/
  });

/*  describe('#promise functionality', () => {
    it('returns a promise when no callback is given', () => {
      assert.equal(typeof DELETE(localUrl).then, 'function');
      assert.equal(typeof DELETE(localUrl).then, 'function');
    });
    it('resolves the promise with the request object', (done) => {
      DELETE(localUrl).then(() => done());
    });
    it('rejects the promise with an error object', (done) => {
      DELETE('htapoda://asd').then(() => {}).catch((err) => {
        assert.equal(typeof err.message, 'string');
        done();
      });
    });
    it('takes an url string', (done) => {
      DELETE(localUrl)
        .then(() => done())
        .catch((err) => {});
    });
    it('takes an request options object', (done) => {
      DELETE(localOptions)
        .then(() => done())
        .catch((err) => {});
    });
  });*/

});
