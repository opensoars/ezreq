# ezreq

Simple (next gen JS) HTTP requests

[![Build Status](https://travis-ci.org/opensoars/ezreq.svg)](https://travis-ci.org/opensoars/ezreq)
[![Coverage Status](https://coveralls.io/repos/github/opensoars/ezreq/badge.svg?branch=master)](https://coveralls.io/github/opensoars/ezreq?branch=master)
[![Inline docs](http://inch-ci.org/github/opensoars/ezreq.svg?branch=master)](http://inch-ci.org/github/opensoars/ezreq)
[![Codacy Badge](https://api.codacy.com/project/badge/f3e64501763645b9aa483bf83a4dd1d5)](https://www.codacy.com/app/sam_1700/ezreq)
[![Code Climate](https://codeclimate.com/github/opensoars/ezreq/badges/gpa.svg)](https://codeclimate.com/github/opensoars/ezreq)
[![Dependency Status](https://www.versioneye.com/user/projects/5890a74d6a0b7c003b834559/badge.svg)](https://www.versioneye.com/user/projects/5890a74d6a0b7c003b834559)

---

@NOTE
Lets always translate url to object. (could even use it to allow the old api, whith both a url string and options object)

## Impression

The code below demonstrates `ezreq` usage. This code can be used for quick reference, even though it only covers the `GET` method.

```js
import {GET} from 'ezreq';

// Callback style
GET('http://github.com', (err, res) => {
  if (err) return console.log(`Got error, message: ${err.message}`);
  console.log(`Got res, body length: ${res.body.length}`);
});

// Promise style
GET('http://github.com')
  .then((res) => console.log(`Got res, body length: ${res.body.length}`))
  .catch((err) => console.log(`Got error, message: ${err.message}`));

// Promise style using async await
async () => {
  try {
    const res = await GET('http://github.com');
    console.log(`Got res, body length: ${res.body.length}`);
  }
  catch (err) {
    console.log(`Got error, message: ${err.message}`);
  }
}
```


## Install

Run `npm install ezreq`

## Include

When `ezreq` is required, it returns an object containing all `ezreq` functionality.

Add the following line for modern JS: 
```js
import {GET, PUT, POST, DELETE} from 'ezreq';

// 3 Character lowercase aliases 
import {get, put, pst, dlt} from 'ezreq';
```

Add the following lines for older JS: 
```js
var ezreq = require('ezreq');
var GET = ezreq.GET;
var PUT = ezreq.PUT;
var POST = ezreq.POST;
var DELETE = ezreq.DELETE;

// 3 Character lowercase aliases
var ezreq = require('ezreq');
var get = ezreq.get;
var put = ezreq.put;
var pst = ezreq.pst;
var dlt = ezreq.dlt;
```

## Use

Basic functionality is described below.

### GET (get)

#### Regular callback handling

Arguments: `GET(urlString|optionsObject, [callbackFunction])`

```js
GET('http://github.com/opensoars', (res) => {
  console.log(`Got body of length: ${res.body.length}`);
}).on('error', (e) => console.log(`On error: ${e.message}`));
```

#### Promise callback handling  

Arguments: `GET(urlString|optionsObject)`

```js
GET('http://github.com/opensoars')
  .then((res) => console.log(`Got body of length: ${res.body.length}`))
  .catch((e) => console.log(`On error: ${e.message}`));
```

#### Async await

Arguments: `GET(urlString|optionsObject)`

```js
async () => {
  try {
    const res = await GET('http://github.com/opensoars');
    console.log(`Got body of length: ${res.body.length}`);
  }
  catch (e) { console.log(`On error: ${e.message}`); }
};
```

### PUT (put)

#### Promise callback handling

```js
PUT();
```

#### Async await

```js
PUT();
```

### POST (pst)

#### Promise callback handling

```js
POST();
```

#### Async await

```js
POST();
```

### DELETE (dlt)

#### Regular callback handling

Arguments: `DELETE(urlString|optionsObject, [callbackFunction])`

```js
DELETE('http://github.com/opensoars', (res) => {
  console.log(`Got body of length: ${res.body.length}`);
}).on('error', (e) => console.log(`On error: ${e.message}`));
```

#### Promise callback handling  

Arguments: `DELETE(urlString|optionsObject)`

```js
DELETE('http://github.com/opensoars')
  .then((res) => console.log(`Got body of length: ${res.body.length}`))
  .catch((e) => console.log(`On error: ${e.message}`));
```

#### Async await

Arguments: `DELETE(urlString|optionsObject)`

```js
async () => {
  try {
    const res = await DELETE('http://github.com/opensoars');
    console.log(`Got body of length: ${res.body.length}`);
  }
  catch (e) { console.log(`On error: ${e.message}`); }
};
```


## Develop

The following tools can be used whilst developing `ezreq`.

### Development `test_local`

Run this command: `npm run test_local` to run all tests on the local machine and to collect code coverage information. The code coverage report can be found at `coverage/lcov-report/index.html`.

### File watcher which runs `test_local` and coverage info collector

Run `npm run test_watch`. The `test_watch` command runs the `test_local` command everytime a file change is detected. Customize in order to exclude certain paths or file types.

### Documentation

Run the following command to generate documentation from the source code: `npm run doc`. This will place documentation generated by `jsdoc` at `doc/jsdoc/index.html`.

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-epic-feature)
3. Commit your changes (git commit -am 'Add epic feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## Copyright

Copyright (c) 2017 Sam @ Opensoars. See [LICENSE](https://github.com/opensoars/ezreq/blob/master/LICENSE) for details.

