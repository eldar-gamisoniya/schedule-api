const Router = require('express').Router;
const router = new Router();

const user  = require('./model/user/user-router');
const schedule  = require('./model/schedule/schedule-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to schedule API!' });
});

router.use('/user', user);
router.use('/schedule', schedule);


module.exports = router;
