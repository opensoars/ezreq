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



describe('PUT', () => {

  let instance;
  before((done) => {
    instance = http.createServer((req, res) => res.end('ok')).listen(port);
    instance.on('listening', () => done())
  })

  after((done) => {
    instance.close();
    done();
  });

  const PUT = REQ('src/PUT');
  describe('#require', () => {
    it('returns a function', () => assert.equal(typeof PUT, 'function'));
  });
});
