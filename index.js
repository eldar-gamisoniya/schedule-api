const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');
const passport   = require('passport');

const config = require('./config');
const routes = require('./routes');
const configuratePassport = require('./passport');

const app  = express();

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

configuratePassport(passport);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(passport.initialize());
app.use('/', routes);

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
