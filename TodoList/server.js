'use strict';
require('marko/node-require'); // Allow Node.js to require and load `.marko` files
var express = require('express');
var markoExpress = require('marko/express');

//load the view-templates
var templateUser = require('./views/users');
var templateHome = require('./views/index');
var templateTodo = require('./views/todo/index');
var templateTest = require('./views/test/index');
var templateTicTacToe = require('./views/tictactoe/index');

var app = express();
app.use(markoExpress()); //enable res.marko(template, data)
app.use('/static', express.static(__dirname + '/views/public')); //other files like css or img are loaded from here
//f.e.   <link rel="stylesheet" href="static/style.css">

var users = [];
users.push({ name: 'tobi' });
users.push({ name: 'loki' });
users.push({ name: 'jane' });

var oo = require('json8');
/*var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function () {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
        console.log(row.id + ": " + row.info);
    });
});
db.close();*/

//setup the routing for urls
app.get('/users', function (req, res) {
    res.marko(templateUser, {
        title: 'Users',
        users: users
    });
});
app.post('/arrivals/saveform', function (req, res) {
    console.log(req._dump());
    res.send('POST request to homepage');
});
app.get('/api', function (req, res) {
    var set = new Set()
    set.add({"id":"1", "title": "Malta to Rome", "status": "On time", "time": "12:05" });
    set.add({"id": "2", "title": "Malta to Zittau", "status": "On time", "time": "12:05" });
    res.send(oo.serialize(set));
});
app.get('/api2', function (req, res) {
    var map = new Map()
    map.set("1",{ "title": "Bonn to Rome", "status": "On time", "time": "12:05" });
    map.set("2",{ "title": "Bonn to Zittau", "status": "On time", "time": "12:05" });
    res.send(oo.serialize(map));
});

app.get('/test', function (req, res) {
    res.marko(templateTest, {});
});

app.get('/todo', function (req, res) {
    res.marko(templateTodo, {});
});
app.get('/tictac', function (req, res) {
    res.marko(templateTicTacToe, {});
});
app.get('/', function (req, res) {
    res.marko(templateHome, {    });
});

/*var template = marko.load(require.resolve('./views/hello.marko'));
app.get('/', function (req, res) {
    template.stream({
        title: 'Users',
        users: users
    }).pipe(res);
});*/
var server = app.listen(3030, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});