const verifyArguments = require('./verifyArguments');
const sanitizeArguments = require('./sanitizeArguments');
const cbRequest = require('./cbRequest');
const promiseRequest = require('./promiseRequest');

/**
 * Makes an HTTP request according to arguments. Either using a callback
 * or using a promise (of which its handling can be omitted for ez use).
 * @module 
 * @param {array} arguments - Request details
 * @return {self|promise} - Depends on what the user wants, cb or promise
 * @example
 * GET('http://google.com'); // GET request with no cbs / promise handling
 * GET('http://google.com', (err, res) => {}); // Cb a la Node.js
 * GET('http://google.com', getOptionsObject) // request options a la Node.js
 *   .then((res) => {})   // No cb means promise return
 *   .catch((err) => {}); // which can be used w/ async await
 */
module.exports = function GET() {
  const args = sanitizeArguments(verifyArguments(arguments));
  if (args.cb) {
    cbRequest({url: args.url, options: args.options, cb: args.cb});
    return GET;
  }
  else return promiseRequest({url: args.url, options: args.options});
};
