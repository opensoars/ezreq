const is = require('is');

/**
 * Throws errors when the arguments passed to GET are not of the right
 * type.
 * @module GET/verifyArguments
 * @param {array} a - Arguments passed to GET
 * @return {array} a
 * @example
 * verifyArguments(123) // throws
 * verifyArguments([])  // throws
 * verifyArguments({})  // throws
 * verifyArguments(['hello']) // doesnt throw
 * verifyArguments([{}])      // doesnt throw
 */
module.exports = function verifyArguments(a = []) {
  if (a.length === 0)
    throw new Error('ezreq.GET requires at least 1 argument');
  else if (a.length >= 1 && !(is.string(a[0]) || is.object(a[0])) )
    throw new Error('ezreq.GET requires a string or object as 1st argument');
  return a;
};
