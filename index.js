'use strict'

const {Transform, PassThrough} = require('stream')
const zlib = require('zlib')
const isGzip = require('is-gzip')

class Gunzip extends Transform {

  _initInternalTransformStream(gunzip = false) {
    this._internalTransformStream = gunzip ?
      new zlib.Gunzip() :
      new PassThrough()
    this._internalTransformStream.on('data', chunk => {
      this.push(chunk)
    })
    this._internalTransformStream.on('error', err => {
      this.emit('error', err)
    })
    this._internalTransformStream.on('end', () => {
      this._flushCb()
    })
  }

  _transform(chunk, encoding, cb) {
    if (!this._internalTransformStream) {
      this._initInternalTransformStream(isGzip(chunk))
    }
    this._internalTransformStream.write(chunk)
    cb()
  }

  _flush(cb) {
    if (this._internalTransformStream) {
      this._internalTransformStream.end()
      this._flushCb = cb
    } else {
      cb()
    }
  }
}

function createGunzip() {
  return new Gunzip()
}

module.exports = {createGunzip}
