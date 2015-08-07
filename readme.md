# parse-input-stream

Parse a tabular input stream. Can be used to pipe a buffered stream and attempts to parse it as a table -- csv, json, or ndjson are supported.

[![NPM](https://nodei.co/npm/parse-input-stream.png)](https://nodei.co/npm/parse-input-stream/)

## Example

```js
var parseInputStream = require('parse-input-stream')

var inputStream = fs.createReadStream('/path/to/file.csv')

var args = {
  "format": "csv"
}

inputStream.pipe(parseInputStream(args)).pipe(process.stdout)

```
