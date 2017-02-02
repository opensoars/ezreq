const is = require('is');

/**
 * Throws errors when the arguments passed to DELETE are not of the right
 * type.
 * @module DELETE/verifyArguments
 * @param {array} a - Arguments passed to DELETE
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
    throw new Error('ezreq.DELETE requires at least 1 argument');
  else if (a.length >= 1 && !(is.string(a[0]) || is.object(a[0])) )
    throw new Error(
      'ezreq.DELETE requires a string or object as 1st argument'
    );
  return a;
};
