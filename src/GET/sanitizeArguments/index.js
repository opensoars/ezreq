const is = require('is');

/**
 * Returns an object containing the required properties to make an
 * http request.
 * @module GET/sanitizeArguments
 * @param {array} a - Arguments
 * @return {object} args - "Sanitized" arguments
 */
module.exports = function sanitizeArguments(a = []) {
  const args = {};

  // The first argument can either be an url string or an options object
  if (is.string(a[0])) args.url = a[0];
  else if (is.object(a[0])) args.options = a[0];

  // Is there a callback?
  if (is.function(a[1])) args.cb = a[1];

  return args;
};
