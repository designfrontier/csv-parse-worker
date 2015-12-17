var parse = require('csv-parse');
var path = require('path');
var fs = require('fs');
var file = path.join(process.cwd(), process.argv[2]);
var transform = require('stream-transform');

var transformer = transform(function(record, callback){
    // needed to convert the data into a format that process.sdtout isn't sad about
    callback(null, JSON.stringify(record));
}, {parallel: 10});

if(typeof process.argv[2] === 'undefined'){
    throw 'A file to process must be passed in';
}

fs.createReadStream(file)
  .pipe(parse({
    relax: true,
    skip_empty_lines: true,
    trim: true
  }))
  .pipe(transformer)
  .pipe(process.stdout);
