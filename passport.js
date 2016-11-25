const JwtStrategy = require('passport-jwt').Strategy;
const fromHeaderExtractor = require('passport-jwt').ExtractJwt.fromAuthHeader;
const User = require('./model/user/user-schema');
const config = require('./config');

module.exports = function(passport) {
  const opts = {
    secretOrKey: config.secret,
    jwtFromRequest: fromHeaderExtractor()
  };
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({ id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
