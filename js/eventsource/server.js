var http = require('http')
  , fs   = require('fs')
  , PORT = process.argv[2] || 8080
  , HOST = process.argv[3] || '127.0.0.1';
 
 
http.createServer(function (req, res) {
    if (req.url == '/events') {
        res.writeHead(200, { 'Content-Type': 'text/event-stream'
                         , 'Cache-Control': 'no-cache'
                         , 'Connection': 'keep-alive'
                         });

        console.log('Client connect');

        var colors = ['#4bd88e', '#9eda06', '#63c7e4', '#b1a997', '#f509ee', '#28b902', '#dc8508' ];

// The browser attempts to reconnect to the source roughly 3 seconds after each
// connection is closed. You can change that timeout by including a line
// beginning with "retry:", followed by the number of milliseconds to wait before
// trying to reconnect.

        var t = setInterval(function () {
            console.log('Send data');
            var idx = Math.floor(Math.random() * colors.length);
            res.write('retry: 5000\n');
            res.write('data: ' + colors[idx] + '\n\n');
        }, 1000);

        var t2 = setInterval(function () {
            console.log('Send ping');

            var date = new Date();
            var data = {
                'time': date.toUTCString()
            }
            res.write('event: ping\n');
            res.write('retry: 8000\n');
            res.write('data: ' + JSON.stringify(data) + '\n\n');
        }, 2000);        

        res.socket.on('close', function () {
            console.log('Client leave');
            clearInterval(t);
        });

    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(fs.readFileSync(__dirname + '/client.html'));
        res.end()
    }
}).listen(PORT, HOST);