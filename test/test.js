const {createReadStream} = require('fs')
const path = require('path')
const test = require('ava')
const getStream = require('get-stream')
const {createGunzip} = require('..')

test('gzipped stream', async t => {
  const file = createReadStream(path.join(__dirname, 'fixtures', 'hello.txt.gz'))
  const string = await getStream(file.pipe(createGunzip()))
  t.true(string.startsWith('Hello world!'))
})

test('corrupted gzipped stream', async t => {
  const file = createReadStream(path.join(__dirname, 'fixtures', 'corrupted.txt.gz'))
  await t.throws(
    getStream(file.pipe(createGunzip())),
    'incorrect data check'
  )
})

test('not gzipped stream', async t => {
  const file = createReadStream(path.join(__dirname, 'fixtures', 'hello.txt'))
  const string = await getStream(file.pipe(createGunzip()))
  t.true(string.startsWith('Hello world!'))
})

test('empty stream', async t => {
  const file = createReadStream(path.join(__dirname, 'fixtures', 'empty.txt'))
  const string = await getStream(file.pipe(createGunzip()))
  t.is(string, '')
})
