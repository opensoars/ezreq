const assert = require('assert');

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('PUT', () => {
  const PUT = REQ('src/PUT');
  describe('#require', () => {
    it('returns a function', () => assert.equal(typeof PUT, 'function'));
  });
});
