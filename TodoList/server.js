'use strict';
require('marko/node-require'); // Allow Node.js to require and load `.marko` files
var express = require('express');
var markoExpress = require('marko/express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var model = require('./serverlib/model.js')
var users = require('./serverlib/users.js');
const mymodel = model(2);
const myusers = users();
//load the view-templates
var templateUser = require('./views/users');
var templateHome = require('./views/index');
var templateTodo = require('./views/todo/index');
var templateTest = require('./views/test/index');
var templateTodos2 = require('./views/todo2/index');
var templateTicTacToe = require('./views/tictactoe/index');
var templateLogin = require('./views/tictactoe/login')

var app = express();
app.use(markoExpress()); //enable res.marko(template, data)
app.use('/static', express.static(__dirname + '/views/public')); //other files like css or img are loaded from here
//f.e.   <link rel="stylesheet" href="static/style.css">

app.use(require('body-parser').urlencoded({ extended: true }));  //this is needed for passport-local 
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
myusers.init(app);

var oo = require('json8');
console.log(`Modelversion: ${mymodel.version()}`);

function connecting(s) {
    console.log(s.address());
}

function deinit() {
    db.close();
}




//setup the routing for urls
app.get('/users', function (req, res) {
    res.marko(templateUser, {
        title: 'Users',
        users: users
    });
});
//the post-request has to use setRequestHeader("Content-Type", "application/json") !
app.post('/arrivals/saveform', jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400)
    } else {
        console.log(req.body);
        mymodel.save(req.body.tasks)
            //.then(refresh => res.send(refresh ?'refresh':'Done'))
            .then(refresh=>res.send(refresh))
            .catch(reason => console.error(reason));
    }
});
app.get('/api', function (req, res) {
    //var set = new Set()
    //set.add({"id":"1", "title": "Malta to Rome", "status": "On time", "time": "12:05" });
    //set.add({"id": "2", "title": "Malta to Zittau", "status": "On time", "time": "12:05" });
    mymodel.getAll()
        .then(set => res.send(oo.serialize(set)))
        .catch(reason => console.error(reason));
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
app.get('/todo2', function (req, res) {
    res.marko(templateTodos2, {});
});

app.get('/todo', function (req, res) {
    res.marko(templateTodo, {});
});
app.get('/login', function (req, res) {
    res.marko(templateLogin, {
        username: (req.user === undefined) ? '' : req.user.username,
        isLoggedin: (req.user !== undefined) });
});
app.get('/tictac2', 
    myusers.authenticate('local', { session: false }),
    function (req, res) {
        res.json({ message: 'Hello, ' + req.query.name, from: req.user.username });
    });
//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', jsonParser,
    myusers.authenticate(['local', 'anonymous'], { failureRedirect: '/test' }),
    function (req, res) {
        res.redirect('/login');
    });
app.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });

//app.get('/tictac', function (req, res) {
//    res.marko(templateTicTacToe, {});
//});
// curl -v -I http://127.0.0.1:3000/
// curl -v -I --user bob:secret http://127.0.0.1:3000/
/*app.get('/tictac',
    // Authenticate using HTTP Basic credentials, with session support disabled,
    // and allow anonymous requests.
    passport.authenticate(['basic', 'anonymous'], { session: false }),
    function (req, res) {
        if (req.user) {
            res.json({ username: req.user.username, email: req.user.email });
        } else {
            res.json({ anonymous: true });
        }
    });*/
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
server.addListener('connection', connecting);
//mymodel.getByID(1).forEach(function (value) {
//    console.log(value.title);
//});
