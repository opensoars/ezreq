const {GET, PUT, POST, DELETE} = require('./../src');


/*GET('http://google.nl', { options: true }, function cb(err, res) {

  if (err)
    return console.log('ERRR', err.message);

  console.log('NO ERRR res body length:', res.body.length);

});*/


GET('http://google.nl', {opts: true})
  .then((res) => console.log(res.body.length))
  .catch((e) => console.log(e));