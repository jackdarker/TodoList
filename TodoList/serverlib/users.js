'use strict';
var passport = require('passport')
var AnonymousStrategy = require('passport-anonymous').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var _users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];
function init(app) {
    
    function findById(id, cb) {
        process.nextTick(function () {
            var idx = id - 1;
            if (_users[idx]) {
                cb(null, _users[idx]);
            } else {
                cb(new Error('User ' + id + ' does not exist'));
            }
        });
    }
    function findByUsername(username, fn) {
        for (var i = 0, len = _users.length; i < len; i++) {
            var user = _users[i];
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

    passport.use(new AnonymousStrategy());
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
    app.use(passport.session());
};

function authenticate(strategy, callback) {
    return passport.authenticate(['local', 'anonymous'], { failureRedirect: '/login' })
};

module.exports = () => {
    return {
        users: () => _users,
        init: (app) => init(app),
        authenticate:(strategy, callback) => authenticate(strategy, callback)
    };
};