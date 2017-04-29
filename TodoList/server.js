'use strict';
require('marko/node-require'); // Allow Node.js to require and load `.marko` files
var express = require('express');
var markoExpress = require('marko/express');

//load the view-templates
var templateUser = require('./views/users');
var templateHome = require('./views/index');
var templateTodo = require('./views/todo/index');
var templateTicTacToe = require('./views/tictactoe/index');

var app = express();
app.use(markoExpress()); //enable res.marko(template, data)
app.use('/static', express.static(__dirname + '/views/public')); //other files like css or img are loaded from here
//f.e.   <link rel="stylesheet" href="static/style.css">

var users = [];
users.push({ name: 'tobi' });
users.push({ name: 'loki' });
users.push({ name: 'jane' });

//setup the routing for urls
app.get('/users', function (req, res) {
    res.marko(templateUser, {
        title: 'Users',
        users: users
    });
});
app.get('/todo', function (req, res) {
    res.marko(templateTodo, {});
}); app.get('/tictac', function (req, res) {
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
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});