/**
 * Test 01
 */
var fs = require('fs')
  , path = require('path')

/*
  Create target folder for writing
*/
var myPath = path.join(__dirname, 'foo');
if (!fs.existsSync(myPath))
  fs.mkdirSync(myPath);

/*
  Sync write call
*/
var newPath = path.join(myPath, 'demo.txt');
fs.writeFileSync(newPath, 'Hello World!');

/*
  Async read call
*/
fs.readFile(newPath, function(err, data) {
  console.log(data.toString());
  console.log('File read.');
});

console.log('File written.');