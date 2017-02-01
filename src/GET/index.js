const {http, https} = require('reqqer')(['http', 'https']);

/**
 * 
 * @private
 */
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

/**
 * @TODO this could be done better, without the 2x http.get
 * shud be quite easy..
 * @public
 * @param {array} arguments - @TODO
 * @return {self|promise} - Depends on what the user wants cb or promise
 * @example
 * GET();
 */
module.exports = function GET() {
  const args = verifyArguments(sanitizeArguments(arguments));
  console.log(args);

  // Returns GET, handle request with callbacks
  if (args.cb) {
    try {
      http.get(args.url || args.options, (res) => {
        res.body = '';
        res.on('data', c => res.body += c);
        res.on('end', () => args.cb(null, res));
      }).on('error', (e) => args.cb(e));
    }
    catch (e) { args.cb(e); }
    return GET;
  }
  else {
    return new Promise((resolve, reject) => {
      try {
        http.get(args.url || args.options, (res) => {
          res.body = '';
          res.on('data', c => res.body += c);
          res.on('end', () => resolve(res));
        }).on('error', (e) => reject(e));
      }
      catch (e) { reject(e); }
    });
  }
};
