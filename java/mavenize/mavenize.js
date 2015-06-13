#!/usr/bin/env node

var exec = require('child_process').exec
  , path = require('path')
  , sys = require('sys')
  , fs = require('fs')
  , mkdirp = require('mkdirp');

var metadataTemplate = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \
<metadata> \
  <groupId>__groupid__</groupId> \
  <artifactId>__artifact__</artifactId> \
  <versioning> \
    <latest>__latest__</latest> \
    <release>__release__</release> \
    <versions> \
      <version>__version__</version> \
    </versions> \
    <lastUpdated>__lastupdated__</lastUpdated> \
  </versioning> \
</metadata>";

if (process.argv.length < 3) {
    console.log('Insufficient arguments! Specify plugins directory path.');
    process.exit(1);
}
if (process.argv.length < 4) {
    console.log('Insufficient arguments! Specify output directory path.');
    process.exit(1);
}

var pluginsPath = path.resolve(path.normalize(process.argv[2]));
var outputPath = path.resolve(path.normalize(process.argv[3]));
var groupName = process.argv[4] || 'nogroup';

if (!fs.existsSync(outputPath)) {
    fs.mkdir(outputPath, '0755');
}

console.log();
console.log('Looking in ' + pluginsPath);
console.log('Saving to ' + outputPath);
console.log();

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", done);

  var wr = fs.createWriteStream(target);
  wr.on("error", done);
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

fs.readdir(pluginsPath, function(err, files) {
    if(err) 
        throw err;
    files.forEach(function(file) {
        if (path.extname(file) === '.jar') {
            var compName = path.basename(file, '.jar');
            var components = compName.split('-');
            var compName = components[0].split('_')[0];
            var snapshot = components[1];
            snapshot = snapshot || '0.0.0';
            // if (!snapshot) {
            //     throw "Version not found in file - " + file;
            // } 

            // var dotsComps = compName.split('.');
            // var lastUpdated = dotsComps[dotsComps.length-1].replace(/[a-zA-Z]+/ig, '') ;
            var now = new Date();
            lastUpdated = now.getFullYear() + '' + now.getMonth()+1 + '' + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds();
            // console.log(lastUpdated);

            var inPath = path.join(pluginsPath, file);
            var dirPath = path.join(outputPath, compName, snapshot);
            var fullPath = path.join(outputPath, compName, snapshot, file);
            console.log('Saving to ' + fullPath);
            mkdirp(dirPath, {mode: '0755'}, function (err) {
                if (err) throw err;
                copyFile(inPath, fullPath, function (err) {
                    if (err) throw err;
                });
                // write Maven meta-data
                var meta = metadataTemplate.replace('__version__', snapshot);
                meta = meta.replace('__latest__', snapshot);
                meta = meta.replace('__release__', snapshot);
                meta = meta.replace('__lastupdated__', lastUpdated);
                meta = meta.replace('__artifact__', compName);
                meta = meta.replace('__groupid__', groupName);
                fs.writeFile(path.join(outputPath, compName, 'maven-metadata.xml'), meta, function (err) {
                    if (err) throw err;
                }); 
            });
        }
    });
 });
