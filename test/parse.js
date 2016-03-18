var test = require('tape')
var fs = require('fs')
var path = require('path')
var parseInputStream = require('../')

test('parse json', function (t) {
  var opts = {'format': 'json'}
  collectResults('dummy.json', opts, verify)
  function verify (err, lines) {
    t.false(err, 'no err')
    t.same(lines[0], { foo: 'bar', name: 'josie', age: '35' }, 'first row is an object')
    t.equal(lines.length, 3, '3 rows')
    t.end()
  }
})

test('parse csv', function (t) {
  var opts = {'format': 'csv'}
  collectResults('dummy.csv', opts, verify)
  function verify (err, lines) {
    t.false(err, 'no err')
    t.same(lines[0], {a: '1', b: '2', c: '3'}, 'first row is an object with csv headers as object keys')
    t.equal(lines.length, 1, '1 row')
    t.end()
  }
})

// helpers

function fixture (name) {
  return path.join(__dirname, 'data', name)
}

function collectResults (file, opts, cb) {
  if (typeof opts === 'function') return collectResults(file, null, opts)
  var data = fs.createReadStream(fixture(file))
  var lines = []
  var parser = parseInputStream(opts)
  data.pipe(parser)
    .on('data', function (line) {
      lines.push(line)
    })
    .on('error', function (err) { cb(err, lines) })
    .on('end', function () { cb(false, lines) })
  return parser
}
