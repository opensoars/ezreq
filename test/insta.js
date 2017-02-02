const {GET, PUT, POST, DELETE} = require('./../src');

const port = 80;
const hostName = 'localhost';
const localUrl = `http://${hostName}:${port}`;
const localOptions = {
  hostname: 'www.google.com',
  port: port,
  method: 'DELETE'
};


DELETE('http://google.nl', function cb(err, res) {

  if (err)
    return console.log('cb err', err);

  console.log('NO ERRR res body length:', res.body.length);

})/*('http://google.nl', { options: true }, function cb(err, res) {

  if (err)
    return console.log('cb err', err);

  console.log('NO ERRR 2 res body length:', res.body.length);

})*/


GET('http://google.nl', {opts: true})
  .then((res) => console.log(res.body.length))
  .catch((err) => console.log('prom err', err));