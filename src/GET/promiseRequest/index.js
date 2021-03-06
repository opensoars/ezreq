const http = require('http');

const TIMEOUT = 5000;

/**
 * Makes an HTTP GET request using either a url string or an options object.
 * Succes or failure is handled by promise resolve or reject calls.
 * @module GET/promiseRequest
 * @param {string} url - Request either this or options object
 * @param {object} options - Request either this or url string
 * @return {promise}
 * @example
 * promiseRequest('http://google.com')
 *   .then(() => {})
 *   .catch(() => {});
 */
module.exports = function promiseRequest({url, options}) {
  return new Promise((resolve, reject) => {
    try {
      http.get(url || options, (res) => {
        res.body = '';
        res.on('data', (c) => res.body += c).on('end', () => resolve(res));
      }).on('error', (err) => reject(err))
        .setTimeout(TIMEOUT, function () { this.abort(); });
    }
    catch (err) { reject(err); }
  });
};
