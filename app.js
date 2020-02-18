const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const pug = require('pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded, i.e. form posts
app.use(express.json()); // for parsing application/json

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('html', pug.renderFile);

var signInRouter = require('./routes/sign-in-router');
app.use('/sign-in', signInRouter);

var indexRouter = require('./routes/index-router');
app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.port).on('listening', () => {
  console.log();
  console.log('🚀 Noddyx Server is up!');
  console.log();
});

module.exports = app;