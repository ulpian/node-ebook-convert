// require e-book convert index
var convert = require('../../index.js'),
	extract = require('extract-zip'),

	// define source and target
	source = 'test/test.html',
	target = 'test/bookepub/test.epub',
  targetex = 'test/bookext/test';


var epub = convert({
  source: source,
  target: target,
  targetex: targetex,
  arguments: [
    ['--base-font-size', '10'], 
    ['--authors', 'Seth Vincent'],
    ['--extra-css', 'test.css']
  ]
});

epub.on('data', function(data){
    console.log('calibre: ' + data);
});

epub.on('error', function(data){
    console.log('calibreError: ' + error);
});

epub.on('close', function(code){
  console.log('calibre: ' + code);
});