const GET =  require('./GET');
const PUT =  require('./PUT');
const POST =  require('./POST');
const DELETE =  require('./DELETE');

/**
 * Let's put all methods currently in DELETE a fs layer higher
 * More generic approach up next
 */

/**
 * Module object that gets required.
 * @module ezreq
 * @example
 * import {GET, PUT, POST, DELETE} from 'ezreq'
 */
module.exports = {GET, PUT, POST, DELETE};


