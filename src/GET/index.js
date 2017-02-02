const {http, https} = require('reqqer')(['http', 'https']);

/***/
const isObj = x => !(x instanceof Array) && typeof x === 'object';
const isStr = x => typeof x === 'string';
const isFun = x => typeof x === 'function';

/**
 * Throws errors when the arguments passed to GET are not of the right
 * type.
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
  else if (a.length >= 1 && !(isStr(a[0]) || isObj(a[0])) )
    throw new Error('ezreq.GET requires a string or object as 1st argument');
  return a;
}


/**
 * Returns an object containing the required properties to make an
 * http request.
 * @param {array} a - Arguments
 * @return {object} args - "Sanitized" arguments
 */
function sanitizeArguments(a = []) {
  const args = {};

  // Is the first argument can either be an url string or an options object
  if (isStr(a[0])) args.url = a[0];
  else if (isObj(a[0])) args.options = a[0];

  // The 2nd argument can be an options object as well
  if (isObj(a[1])) args.options = a[1];

  // Is there a callback?
  if (isFun(a[1])) args.cb = a[1];
  else if (isFun(a[2])) args.cb = a[2];

  return args;
}

function cbRequest(args) {
  try {
    http.get(args.url || args.options, (res) => {
      res.body = '';
      res.on('data', c => res.body += c).on('end', () => args.cb(null, res));
    }).on('error', (err) => args.cb(err));
  }
  catch (e) { args.cb(e); }
}

function promiseRequest(args) {
  return new Promise((resolve, reject) => {
    try {
      http.get(args.url || args.options, (res) => {
        res.body = '';
        res.on('data', (c) => res.body += c).on('end', () => resolve(res));
      }).on('error', (err) => reject(err));
    }
    catch (err) { reject(err); }
  });
}

/**
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
    cbRequest(args);
    return GET;
  }
  else return promiseRequest(args);
};
