'use strict';
require('marko/node-require'); // Allow Node.js to require and load `.marko` files
var express = require('express');
var markoExpress = require('marko/express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var model = require('./serverlib/model.js')
var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
var DigestStrategy = require('passport-http').DigestStrategy
var AnonymousStrategy = require('passport-anonymous').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const mymodel = model(2);
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

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];
function findById(id, cb) {
    process.nextTick(function () {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}
function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}
// Use the BasicStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.
/*??passport.use(new BasicStrategy({
},
    function (username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure.  Otherwise, return the authenticated `user`.
            findByUsername(username, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (user.password != password) { return done(null, false); }
                return done(null, user);
            })
        });
    }
));*/
// Configure the Digest strategy for use by Passport.
//
// The Digest strategy requires a `secret`function, which is used to look up
// user.  The function must invoke `cb` with the user object as well as the
// user's password as known by the server.  The password is used to compute a
// hash, and authentication will fail if the computed value does not match that
// of the request.  The user object will be set at `req.user` in route handlers
// after authentication.
/*??passport.use(new DigestStrategy({ qop: 'auth' },
    function (username, cb) {
        findByUsername(username, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user, user.password);
        })
    }));
*/
// Use the BasicStrategy within Passport.
//   This is used as a fallback in requests that prefer authentication, but
//   support unauthenticated clients.
//??passport.use(new AnonymousStrategy());
passport.use(new LocalStrategy(
    function (username, password, cb) {
       findByUsername(username, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
// Initialize Passport!  Note: no need to use session middleware when each
// request carries authentication credentials, as is the case with HTTP Basic.
app.use(passport.initialize());

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
    res.marko(templateLogin, {});
});
app.get('/tictac2', 
    passport.authenticate('local', { session: false }),
    function (req, res) {
        res.json({ message: 'Hello, ' + req.query.name, from: req.user.username });
    });
//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
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
app.get('/tictac',
    // Authenticate using HTTP Basic credentials, with session support disabled,
    // and allow anonymous requests.
    passport.authenticate(['basic', 'anonymous'], { session: false }),
    function (req, res) {
        if (req.user) {
            res.json({ username: req.user.username, email: req.user.email });
        } else {
            res.json({ anonymous: true });
        }
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
server.addListener('connection', connecting);
//mymodel.getByID(1).forEach(function (value) {
//    console.log(value.title);
//});
