const controller = require('./schedule-controller');
const Router = require('express').Router;
const router = new Router();
const passport = require('passport');

router.route('/')
  .get((...args) => controller.find(...args))
  .post(passport.authenticate('jwt', { session: false }), (...args) => controller.create(...args));

router.route('/:id')
  .put(passport.authenticate('jwt', { session: false }), (...args) => controller.update(...args))
  .get((...args) => controller.findById(...args));

module.exports = router;
