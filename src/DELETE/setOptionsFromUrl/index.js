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
  console.log(urlObj);
  options.hostname = urlObj.hostname;
  options.port = urlObj.port || 80;
  options.path = urlObj.path || '/';
  options.method = 'GET';
  options.protocol = urlObj.protocol;

  console.log(options);

  return options;
}