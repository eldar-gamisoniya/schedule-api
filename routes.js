const Router = require('express').Router;
const router = new Router();

const schedule  = require('./model/schedule/schedule-router');
const account = require('./model/account/account-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to schedule API!' });
});

router.use('/account', account);
router.use('/schedule', schedule);

module.exports = router;
