const assert = require('assert');

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('POST', () => {
  const POST = REQ('src/POST');
  describe('require', () => {
    it('returns a function', () => assert.equal(typeof POST, 'function'));
  });
});
