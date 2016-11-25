const Router = require('express').Router;
const jwt = require('jwt-simple');
const router = new Router();

const User = require('../user/user-schema');
const config = require('../../config');
const passport = require('passport');

router.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please pass email and password.' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, message: 'Email already exists.' });
      }
      res.json({ success: true, message: 'Successful created new user.' });
    });
  }
});

router.post('/authenticate', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({ success: true, token: `JWT ${token}` });
        } else {
          res.send({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});

function getToken(headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return null;
}

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  if (token) {
    const decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(403)
          .send({ success: false, message: 'Authentication failed. User not found.' });
      }
      res.json({ success: true, message: `Welcome in the member area ${user.email}!` });
    });
  } else {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
});

module.exports = router;
