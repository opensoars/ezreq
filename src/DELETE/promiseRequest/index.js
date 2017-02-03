const http = require('http');
const https = require('https');

/**
 * Makes an HTTP DELETE req using the parsed options object
 * Succes or failure is handled by promise resolve or reject calls.
 * @module DELETE/promiseRequest
 * @param {string} url - Request either this or options object
 * @param {object} options - Request either this or url string
 * @return {promise}
 * @example
 * promiseRequest('http://google.com')
 *   .then(() => {})
 *   .catch(() => {});
 */
module.exports = function promiseRequest({options}) {
  return new Promise((resolve, reject) => {
    try {
      (options.protocol === 'https:' ? https : http)
        .request(options, (res) => {
        res.body = '';
        res.on('data', (c) => res.body += c).on('end', () => resolve(res));
      }).on('error', (err) => reject(err));
    }
    catch (err) { reject(err); }
  });
};
