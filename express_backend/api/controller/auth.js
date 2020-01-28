const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require("../model/schema/user");

// Authenticates login

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETORKEY;

module.exports = app => {
    app.use(passport.initialize());

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) return done(null, user);
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};
