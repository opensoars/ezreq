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
 * DELETE('http://google.com'); // DELETE req with no cbs / promise handling
 * DELETE('http://google.com', (err, res) => {}); // Cb a la Node.js
 * DELETE('http://google.com', getOptionsObject) // req options a la Node.js
 *   .then((res) => {})   // No cb means promise return
 *   .catch((err) => {}); // which can be used w/ async await
 */
module.exports = function DELETE() {

  // I GOTTA MAKE REQ OBJECT FROM URL STRING
  // Which can be done in the sanitizeArguments function

  const args = sanitizeArguments(verifyArguments(arguments));
  if (args.cb) {
    cbRequest({url: args.url, options: args.options, cb: args.cb});
    return DELETE;
  }
  else return promiseRequest({url: args.url, options: args.options});
};
