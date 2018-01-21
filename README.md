# gunzip-stream [![npm version](https://img.shields.io/npm/v/gunzip-stream.svg)](https://www.npmjs.com/package/gunzip-stream) [![Build Status](https://travis-ci.org/jdesboeufs/gunzip-stream.svg?branch=master)](https://travis-ci.org/jdesboeufs/gunzip-stream)

> Gunzip a stream if needed

`Transform` stream which acts as `zlib.Gunzip` if input is gzipped. Fallback otherwise to a simple `PassThrough` stream.

## Install

```
$ npm install gunzip-stream
```


## Usage

```js
const fs = require('http');
const {createGunzip} = require('gunzip-stream');

fs.createReadStream('/path/to/file.gz.or.not')
  .pipe(createGunzip())
  .pipe(process.stdout)
```

## License

MIT
