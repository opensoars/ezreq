const http = require('http');
const https = require('https');

/**
 * @TODO
 * Makes an HTTP DELETE req using either a url string or an options object.
 * Success or failure is handled by callbacks.
 * @module DELETE/cbRequest
 * @param {string} url - Request either this or options object
 * @param {object} options - Request either this or url string
 * @param {function} cb - Call on request end or error
 * @return {void}
 * @example
 * cbRequest('http://google.com', (err, res) => {});
 */
module.exports = function cbRequest({url, options, cb}) {
  try {
    (options.protocol === 'https:' ? https : http).request(options, (res) => {
      res.body = '';
      res.on('data', (c) => res.body += c).on('end', () => cb(null, res));
    }).on('error', (err) => cb(err));
  }
  catch (err) { cb(err); }
};
