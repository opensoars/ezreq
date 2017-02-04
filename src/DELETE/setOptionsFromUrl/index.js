const urlLib = require('url');

/**
 * Extracts HTTP request object options from an url and puts them
 * in the options object argument, returns that object when done.
 * @module DELETE/setOptionsFromUrl
 * @param {object} options - HTTP request options object (might be empty)
 * @param {string} url - A url string to extract options from
 * @return {object} options
 */
module.exports = (options, url) => {
  const urlObj = urlLib.parse(url);
  options.hostname = urlObj.hostname;
  options.port = urlObj.port;
  options.path = urlObj.path;
  options.method = 'DELETE';

  const matches = /(.+?\:)/.exec(url);
  if (matches instanceof Array && matches[1])
    options.protocol = matches[1];
  else
    options.protocol = 'http:';

  return options;
}