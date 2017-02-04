const is = require('is');

/**
 * Has to be docced a little bit better, since this is still
 * a "complex" function!
 * Returns an object containing the required properties to make an
 * HTTP request.
 * @module DELETE/sanitizeArguments
 * @param {array} a - Arguments
 * @return {object} args - "Sanitized" arguments
 */
module.exports = function sanitizeArguments(a = []) {
  const args = {};

  // The first argument can either be an url str or an options obj
  if (is.string(a[0]))
    args.url = a[0];
  else if (is.object(a[0]))
    args.options = a[0];

  // Lets always use an request options object
  if (!args.options)
    args.options = {};

  // Is there a callback? Check a[2] with extended incoming API
  if (is.function(a[1]))
    args.cb = a[1];

  return args;
};
