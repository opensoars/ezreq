const http = require('http');

const TIMEOUT = 5000;

/**
 * Makes an HTTP GET request using either a url string or an options object.
 * Success or failure is handled by callbacks.
 * @module GET/cbRequest
 * @param {string} url - Request either this or options object
 * @param {object} options - Request either this or url string
 * @param {function} cb - Call on request end or error
 * @return {void}
 * @example
 * cbRequest('http://google.com', (err, res) => {});
 */
module.exports = function cbRequest({url, options, cb}) {
  try {
    http.get(url || options, (res) => {
      res.body = '';
      res.on('data', (c) => res.body += c).on('end', () => cb(null, res));
    }).on('error', (err) => cb(err))
      .setTimeout(TIMEOUT, function () { this.abort(); });
  }
  catch (err) { cb(err); }
};
