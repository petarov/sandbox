var restify = require('restify'),
    fs = require('fs'),
    path = require('path');

var server = restify.createServer();
// storage for new persons
var persons = [];

server.use(restify.CORS({
    origins: ['*'],
    credentials: true
}));    

server.use(restify.fullResponse());
// server.use(restify.pre.sanitizePath());
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.opts(/\.*/, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, HEAD, OPTION');
    res.header('Access-Control-Allow-Headers', 'authorization, content-type, x-requested-with, x-auth-token');
    res.send(200);
    return next();
});

server.listen(8080, function(){
    console.log("Service listen on: 8080");
});

server.get('/offline/cache.manifest', function(req,res,next){
    var filePath = path.join(__dirname,'www/offline/cache.manifest');
    fs.readFile(filePath, function(error, data){
        res.header('Content-Type', 'text/cache-manifest');
        res.send(200, data.toString());
    });
});

server.get(/offline(\/)*.*/, restify.serveStatic({
    directory: path.join(__dirname, 'www'),
    maxAge:0,
    default: 'index.html'
}));
/*
    Send a list of persons currently stored in
    our list    
*/
server.get('/persons', function(req, res, next){
    res.send(200, persons);
});
/*
    Add new person to list
*/
server.post('/persons', function(req, res, body){
    var newPerson = req.body;
    persons.push(newPerson);
    res.send(201, persons);
});
/*
    Remove a person from our list, by Id
*/
server.del('/persons/:id', function(req, res, next){
    var personId = req.params.id;
    for (var i = persons.length - 1; i >= 0; i--) {
        if (persons[i].id === personId) {
            persons.splice(i, 1);
            res.send(201, persons);
            return;
        }
    };
    res.send(404, 'Not found');
});

server.get(/\/.*/, restify.serveStatic({
    directory: path.join(__dirname, 'www/person'),
    maxAge:0,
    default: 'index.html'
}));


// server.get(/person\/.*/, restify.serveStatic({
//     directory: path.join(__dirname, 'www'),
//     maxAge:0
// }));


/*
    Create new person object
*/
var Person = function(vorname, nachname){
    var obj = {
        Vorname: vorname,
        Nachname: nachname
    };
    obj.id = vorname + '_' + nachname;
    return obj;
};

// dummy
persons.push(Person('Max', 'Mustermann 01'));
persons.push(Person('Max', 'Mustermann 02'));

