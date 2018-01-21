const {createReadStream} = require('fs')
const {join} = require('path')
const test = require('ava')
const getStream = require('get-stream')
const {createGunzip} = require('../')

test('gzipped stream', async t => {
  const file = createReadStream(join(__dirname, 'fixtures', 'hello.txt.gz'))
  const str = await getStream(file.pipe(createGunzip()))
  t.true(str.startsWith('Hello world!'))
})

test('corrupted gzipped stream', async t => {
  const file = createReadStream(join(__dirname, 'fixtures', 'corrupted.txt.gz'))
  await t.throws(
    getStream(file.pipe(createGunzip())),
    'incorrect data check'
  )
})

test('not gzipped stream', async t => {
  const file = createReadStream(join(__dirname, 'fixtures', 'hello.txt'))
  const str = await getStream(file.pipe(createGunzip()))
  t.true(str.startsWith('Hello world!'))
})

test('empty stream', async t => {
  const file = createReadStream(join(__dirname, 'fixtures', 'empty.txt'))
  const str = await getStream(file.pipe(createGunzip()))
  t.is(str, '')
})
