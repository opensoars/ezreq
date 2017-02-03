const http = require('http');
const https = require('https');

/**
 * Makes an HTTP DELETE req using the parsed options object.
 * Success or failure is handled by callbacks.
 * @module DELETE/cbRequest
 * @param {object} options - Request using this options object
 * @param {function} cb - Call on request end or error
 * @return {void}
 * @example
 * cbRequest('http://google.com', (err, res) => {});
 */
module.exports = function cbRequest({options, cb}) {
  try {
    (options.protocol === 'https:' ? https : http).request(options, (res) => {
      res.body = '';
      res.on('data', (c) => res.body += c).on('end', () => cb(null, res));
    }).on('error', (err) => cb(err));
  }
  catch (err) { cb(err); }
};
