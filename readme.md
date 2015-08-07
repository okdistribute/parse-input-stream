# parse-input-stream

![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)

Parse a tabular input stream. Can be used to pipe a buffered stream and attempts to parse it as a table -- csv, json, objects, or ndjson are supported.

```
npm install -g parse-input-stream
```

For CSV files, it will attempt to guess the delimiter. Quoted csvs work!

For JSON files, the selector will be auto-detected. Experimental.

## Example

```js
var parseInputStream = require('parse-input-stream')

var inputStream = fs.createReadStream('/path/to/file.csv')

var args = {
  "format": "csv"
}

inputStream.pipe(parseInputStream(args)).pipe(process.stdout)
```

## Options

`format`: string. attempt to parse the stream into the given format. support 'json', 'objects', 'csv', or 'tsv'

`detectMax`: number. the maximum buffer amount to pre-read in order to detect the file type, delimiter, etc. Default 8000