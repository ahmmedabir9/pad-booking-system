const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Manager } = require('./api/models/manager');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET';

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      Manager.findOne({ _id: payload._id })
        .then((manager) => {
          if (!manager) {
            return done(null, false);
          } else {
            return done(null, manager);
          }
        })
        .catch((error) => {
          console.log(error);

          done(error);
        });
    })
  );
};
