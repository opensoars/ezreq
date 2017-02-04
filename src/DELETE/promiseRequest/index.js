const http = require('http');
const https = require('https');

const TIMEOUT = 5000;

/**
 * Makes an HTTP DELETE req using the parsed options object.
 * Succes or failure is handled by promise resolve or reject calls.
 * @module DELETE/promiseRequest
 * @param {object} options - Request using this options object
 * @return {promise}
 * @example
 * promiseRequest('http://google.com')
 *   .then(() => {})
 *   .catch(() => {});
 */


Promise.prototype.GET = function GET() {
  console.log('cool gettin');

  return {GET};
}

module.exports = function promiseRequest({options, useHttps}) {
  return new Promise(function h(resolve, reject) {
    try {
      (options.protocol === 'https:' ? https : http).request(options, (res) => {
        res.body = '';
        res.on('data', (c) => res.body += c).on('end', () => resolve(res));
      }).on('error', (err) => reject(err))
        .setTimeout(TIMEOUT, function () { this.abort(); });
    }
    catch (err) { reject(err); }
  });
};
