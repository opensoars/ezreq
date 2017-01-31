const assert = require('assert');

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('GET', () => {
  const GET = REQ('src/GET');
  describe('require', () => {
    it('returns a function', () => assert.equal(typeof GET, 'function'));
  });
});
