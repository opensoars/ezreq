const {GET, PUT, POST, DELETE} = require('./../src');


GET('http://google.nl', { options: true }, function cb(err, res) {

  if (err)
    return console.log('cb err', err);

  console.log('NO ERRR res body length:', res.body.length);

})('http://google.nl', { options: true }, function cb(err, res) {

  if (err)
    return console.log('cb err', err);

  console.log('NO ERRR 2 res body length:', res.body.length);

})


GET('http://google.nl', {opts: true})
  .then((res) => console.log(res.body.length))
  .catch((err) => console.log('prom err', err));