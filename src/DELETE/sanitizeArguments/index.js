const is = require('is');
const url = require('url');
/**
 * Returns an object containing the required properties to make an
 * http request.
 * @module DELETE/sanitizeArguments
 * @param {array} a - Arguments
 * @return {object} args - "Sanitized" arguments
 */
module.exports = function sanitizeArguments(a = []) {
  const args = {};

  // The first argument can either be an url string or an options object
  if (is.string(a[0])) args.url = a[0];
  else if (is.object(a[0])) args.options = a[0];

  // Lets always use an request options object
  if (!args.options) args.options = {};
  if (args.url) {
    const urlObj = url.parse(args.url);
    args.options.hostname = urlObj.hostname;
    args.options.port = urlObj.port;
    args.options.path = urlObj.path;
    args.options.method = 'DELETE';
    if (args.url.indexOf('https') !== -1)
      args.options.protocol = 'https:';
    else
      args.options.protocol = 'http:';
  }

  // Is there a callback?
  if (is.function(a[1])) args.cb = a[1];

  return args;
};
