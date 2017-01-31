const {http, https} = require('reqqer')(['http', 'https']);

function getIntentions(args) {

}


/**
 * @return {promise}
 * @example
 * GET();
 */
const GET = (url, cb) => {
  try {
    const intentions = getIntentions(arguments);

    http.get(url, (res) => {
      res.body = '';
      res.on('data', c => res.body += c);
      res.on('end', () => cb(res));
    }).on('error', (e) => cb(e));
  }
  catch (e) { cb(e); }
};

module.exports = GET;
