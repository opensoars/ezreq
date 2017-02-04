const {GET, PUT, POST, DELETE} = require('./../src');

const port = 80;
const hostName = 'localhost';
const localUrl = `http://${hostName}:${port}`;
const localOptions = {
  hostname: 'www.google.com',
  port: port,
  method: 'DELETE'
};


/*DELETE('https://google.nl:300/asd?a=b', function cb(err, res) {

  if (err)
    return console.log('cb err', err);

  console.log('NO ERRR res body length:', res.body.length);

})*//*('http://google.nl', { options: true }, function cb(err, res) {

  if (err)
    return console.log('cb err', err);

  console.log('NO ERRR 2 res body length:', res.body.length);

})*/


console.log(DELETE('http://google.nl')
  .then((res) => console.log(res.body.length))
  .catch((err) => console.log('prom err', err))
  .GET().GET().GET());



const newUrlStuff = [
  [ // Note the array: "url data pair"
    'POST:localhost:3030',
    data
  ],
  // Plain strings still work
  'GET:localhost:3030',
  // As well as request objects
  {
    hostname: 'www.google.com',
    port: 80,
    path: '/my/nice/path?is=true',
    method: 'GET'
  },
  // One thing to notice is the ability to put an url in the req options
  // which will be parsed into... request options :)
  {
    url: 'GET:http://google.nl:80',
    path: '/my/nice/path?is=true',
    method: 'GET',
    "NODEJS DATA FORMAT.......": {}
  }
];

/*
(async () => {
  (
    await GET('asd', (err, res) => {})
    ['GET']('hmm', async function (){ await  })
  )
})();*/

// Isnt this good enough?
(async () => {
  const errs = [];
  const resses = [];

  try {
    //ezr.set({parallel: true});
    [].forEach(async (reqObjOrStr) => {
      try { resses.push(await ezreq.REQ(reqObjOrStr)); }
      catch (err) { errs.push(err); }
    });   
  }
  catch (err) {
    // "Operation err, not ezreq.REQ err"
  }

  // .. errs resses
  try {
    await ezr // The await here... hard or what? a final promise?
      .set({parallel: true})         // or even better: THE PROM MANIP?!
      .eachCb.GET([], (err, res) => {
        if (err) return errs.push(err);
        resses.push(res);
      });

    await ezr.POST('localhost:3000');
  }
  catch (err) {
    // This err here.. Hmm That would be the double try catch block ^^^
  }

  // .. errs resses
  try {
    await ezr
      .set({parallel: true, force: false})
      .each.GET([]);
  }
  catch (err) {

  }

})();


/*
(async () => {
  await ezr.each(newUrlStuff, (err, res) => {});
  await 
}();*/
