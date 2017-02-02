const {http, https, is} = require('reqqer')(['http', 'https', 'is']);

/**
 * Throws errors when the arguments passed to GET are not of the right
 * type.
 * @private
 * @param {array} a - Arguments passed to GET
 * @return {array} a
 * @example
 * verifyArguments(123) // throws
 * verifyArguments([])  // throws
 * verifyArguments({})  // throws
 * verifyArguments(['hello']) // doesnt throw
 * verifyArguments([{}])      // doesnt throw
 */
function verifyArguments(a = []) {
  if (a.length === 0)
    throw new Error('ezreq.GET requires at least 1 argument');
  else if (a.length >= 1 && !(is.string(a[0]) || is.object(a[0])) )
    throw new Error('ezreq.GET requires a string or object as 1st argument');
  return a;
}


/**
 * Returns an object containing the required properties to make an
 * http request.
 * @private
 * @param {array} a - Arguments
 * @return {object} args - "Sanitized" arguments
 */
function sanitizeArguments(a = []) {
  const args = {};

  // The first argument can either be an url string or an options object
  if (is.string(a[0])) args.url = a[0];
  else if (is.object(a[0])) args.options = a[0];

  // Is there a callback?
  if (is.function(a[1])) args.cb = a[1];

  return args;
}

/**
 * Makes an HTTP GET request using either a url string or an options object.
 * Success or failure is handled by callbacks.
 * @private
 * @param {string} url - Request either this or options object
 * @param {object} options - Request either this or url string
 * @param {function} cb - Call on request end or error
 * @return {void}
 * @example
 * cbRequest('http://google.com', (err, res) => {});
 */
function cbRequest({url, options, cb}) {
  try {
    http.get(url || options, (res) => {
      res.body = '';
      res.on('data', (c) => res.body += c).on('end', () => cb(null, res));
    }).on('error', (err) => cb(err));
  }
  catch (err) { cb(err); }
}

/**
 * Makes an HTTP GET request using either a url string or an options object.
 * Succes or failure is handled by promise resolve or reject calls.
 * @private
 * @param {string} url - Request either this or options object
 * @param {object} options - Request either this or url string
 * @return {promise}
 * @example
 * promiseRequest('http://google.com')
 *   .then(() => {})
 *   .catch(() => {});
 */
function promiseRequest({url, options}) {
  return new Promise((resolve, reject) => {
    try {
      http.get(url || options, (res) => {
        res.body = '';
        res.on('data', (c) => res.body += c).on('end', () => resolve(res));
      }).on('error', (err) => reject(err));
    }
    catch (err) { reject(err); }
  });
}

/**
 * @module GET
 * Makes an HTTP request according to arguments. Either using a callback
 * or using a promise (of which its handling can be omitted for ez use).
 * @public
 * @param {array} arguments - Request details
 * @return {self|promise} - Depends on what the user wants cb or promise
 * @example
 * GET('http://google.com'); // GET request with no cbs / promise handling
 * GET('http://google.com', (err, res) => {}); // Cb a la Node.js
 * GET('http://google.com', getOptionsObject) // request options a la Node.js
 *   .then((res) => {})   // No cb means promise return
 *   .catch((err) => {}); // which can be used w/ async await
 */
module.exports = function GET() {
  const args = sanitizeArguments(verifyArguments(arguments));
  //console.log('argsargsargsargsargs', args);
  if (args.cb) {
    cbRequest({url: args.url, options: args.options, cb: args.cb});
    return GET;
  }
  else return promiseRequest({url: args.url, options: args.options});
};
