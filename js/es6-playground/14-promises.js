// 14 - Promises are a library for asynchronous programming.
const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    return http.get(url, (response) => {
      response.setEncoding('utf8');
      // Continuously update stream with data
      var body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {
        resolve(body);
      });
    }).on('error', (e) => reject(e.message));
  });
}

get('http://nodejs.org').then((s) => console.log(`OK: ${s}`));
get('https://nodejs.org')
.then((s) => console.log(s))
.catch((s) => console.error(`ERROR: ${s}`));

// eof
