const assert = require('assert');

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('DELETE', () => {
  const DELETE = REQ('src/DELETE');
  describe('#require', () => {
    it('returns a function', () => assert.equal(typeof DELETE, 'function'));
  });
});
