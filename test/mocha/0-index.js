const assert = require('assert');

const REQ = (moduleName) => require(`./../../${moduleName}`);

describe('index', () => {
  const src = REQ('src');
  describe('#require', () => {
    it('returns an object', () => assert.equal(typeof src, 'object'));
  });
});
