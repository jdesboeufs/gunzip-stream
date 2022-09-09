'use strict'

const {Transform, PassThrough} = require('stream')
const zlib = require('zlib')
const isGzip = require('is-gzip')

function createGunzip() {
  let flushCb
  let internalTransformStream

  return new Transform({
    transform(chunk, encoding, cb) {
      if (!internalTransformStream) {
        internalTransformStream = isGzip(chunk)
          ? new zlib.Gunzip()
          : new PassThrough()

          internalTransformStream.on('data', chunk => {
          this.push(chunk)
        })
        internalTransformStream.on('error', error => {
          this.emit('error', error)
        })
        internalTransformStream.on('end', () => {
          flushCb()
        })
      }

      internalTransformStream.write(chunk)
      cb()
    },

    flush(cb) {
      if (internalTransformStream) {
        internalTransformStream.end()
        flushCb = cb
      } else {
        cb()
      }
    }
  })
}

module.exports = {createGunzip}
